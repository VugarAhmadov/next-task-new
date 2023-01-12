import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import axios from "axios";
import { Container, Grid } from "@mantine/core";
import { IBaseResponse, IProduct } from "types";
import { Filters, Products } from "components";

export const getServerSideProps: GetServerSideProps<{ products: IProduct[]; brands: string[] }> = async ({ query }) => {
  const { products } = await axios
    .get<IBaseResponse<IProduct[]>>("https://dummyjson.com/products", {
      params: {
        select: "id,thumbnail,title,description,price,brand,rating",
      },
    })
    .then(({ data }) => data);

  let productsRes = products;

  if (Object.keys(query).length > 0) {
    const filters = {
      ...(query.brand && { brand: query.brand }),
      ...(query.rating && { rating: Number(query.rating as string) }),
    };

    productsRes = products.filter((product) =>
      Object.entries(filters)
        .filter((key) => key)
        .every(([k, v]) => product[k as keyof typeof product] == v)
    );
  }

  return {
    props: {
      products: productsRes,
      brands: products.map((product) => product.brand).filter((item, i, ar) => ar.indexOf(item) === i),
    },
  };
};

const HomePage = ({ products, brands }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // Add filter for price, rating, and brand.
  // Order for title, price, and rating.

  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="Task Products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Container size="xl" px="xs" mt={60}>
          <Grid>
            <Grid.Col span={3}>
              <Filters brands={brands} />
            </Grid.Col>
            <Grid.Col span={9}>
              <Products products={products} />
            </Grid.Col>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
