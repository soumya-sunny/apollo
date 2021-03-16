import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Box,
  Center,
  Grid
} from "@chakra-ui/react";

export const GET_TAGS = gql`
  query tags {
    tags {
      content
      id
    }
  }
`;

const Tags = () => {
  const { data, loading, error } = useQuery(GET_TAGS);

  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={8}       style={{ height: " 70%", marginTop: "10%" }}
    >
        {data.tags &&
          data.tags.map((tag) => (
            <Box w="100%" h="20" bg="blue.500" key={tag.id} style={{    color: "white"}}>
              <Center>
                <Link to={`/quotes/${tag.content}`}>{tag.content}</Link>
              </Center>
            </Box>
          ))}
    </Grid>
  );
};

export default Tags;
