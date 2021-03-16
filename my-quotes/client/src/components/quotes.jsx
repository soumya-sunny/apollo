import React from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Container,
  VStack,
  Button,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

export const GET_QUERIES = gql`
  query Quotes($tag: String!,$after: String) {
    quotes(tag: $tag, after:$after) {
      cursor
      hasMore
      quotes {
        content
        author
      }
    }
  }
`;

const Quotes = ({ match }) => {
  const { data, loading, error,fetchMore } = useQuery(GET_QUERIES, {
    variables: { tag: match.params.tag },
  });

  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Container
      maxW="xl"
      centerContent
      style={{ height: " 100%"}}
    >
      <VStack spacing={4} align="stretch">
        {data.quotes &&
          data.quotes.quotes.map((quote) => (
            <Box key={quote.id} bg="tomato" w="100%" p={4} color="white" style={{marginTop:'40%'}}>
              {quote.content}
            </Box>
          ))}

        {data.quotes && data.quotes.hasMore && (
          <Button
            colorScheme="blue"
            size="xs"
            style={{ width: "80px", marginLeft: "85%" }}
            onClick={async () => {
                console.log("object")
                await fetchMore({
                  variables: {tag: match.params.tag,
                    after: data.quotes.cursor,
                  },
                });
              }}
            rightIcon={<FaArrowRight />}
          >
            Next
          </Button>
        )}
      </VStack>
    </Container>
  );
};

export default Quotes;
