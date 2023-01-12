import { useRouter } from "next/router";
import { Accordion, ActionIcon, List, Slider } from "@mantine/core";
import { IconX } from "@tabler/icons";

interface IFilters {
  brands: string[];
}

export const Filters = ({ brands }: IFilters) => {
  const { query, replace } = useRouter();

  return (
    <Accordion multiple>
      <Accordion.Item value="brand">
        <Accordion.Control>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span>Brands</span>
            <ActionIcon
              variant="light"
              component="span"
              onClick={(e) => {
                e.stopPropagation();
                delete query.brand;

                replace({ query });
              }}
            >
              <IconX size={16} />
            </ActionIcon>
          </div>
        </Accordion.Control>
        <Accordion.Panel>
          <List listStyleType="none" spacing={5}>
            {brands?.map((brand) => (
              <List.Item key={brand} styles={{ itemWrapper: { width: "100%" } }}>
                <a
                  onClick={() =>
                    replace({
                      query: {
                        ...query,
                        brand,
                      },
                    })
                  }
                  style={{ cursor: "pointer", display: "block" }}
                >
                  {brand}
                </a>
              </List.Item>
            ))}
          </List>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="rating">
        <Accordion.Control>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span>Ratings</span>
            <ActionIcon
              variant="light"
              component="span"
              onClick={(e) => {
                e.stopPropagation();
                delete query.rating;

                replace({ query });
              }}
            >
              <IconX size={16} />
            </ActionIcon>
          </div>
        </Accordion.Control>
        <Accordion.Panel>
          <Slider
            min={4}
            max={5}
            precision={2}
            marks={[
              { value: 4, label: "4" },
              { value: 4.25, label: "4.25" },
              { value: 4.5, label: "4.5" },
              { value: 4.75, label: "4.75" },
              { value: 5, label: "5" },
            ]}
            step={0.01}
            value={query.rating ? Number(query.rating) : 4}
            onChange={(value) =>
              replace({
                query: {
                  ...query,
                  rating: value,
                },
              })
            }
            style={{ marginBottom: 20 }}
          />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
