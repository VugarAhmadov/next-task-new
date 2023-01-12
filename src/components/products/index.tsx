import Image from "next/image";
import { Badge, Card, Grid, Group, Text } from "@mantine/core";
import { IProduct } from "types";

interface IProducts {
  products: IProduct[];
}

export const Products = ({ products }: IProducts) => {
  return (
    <Grid>
      {products?.map((product) => (
        <Grid.Col span={4} key={product.id}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
              <div style={{ position: "relative", display: "block", height: 160 }}>
                <Image src={product.thumbnail} fill alt={product.title} sizes="160px" priority={false} />
              </div>
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>{product.title}</Text>
              <Badge color="pink" variant="light">
                ${product.price}
              </Badge>
              <Badge color="orange" variant="light">
                {product.rating}
              </Badge>
              <Badge color="blue" variant="light">
                {product.brand}
              </Badge>
            </Group>

            <Text size="sm" color="dimmed">
              {product.description}
            </Text>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
};
