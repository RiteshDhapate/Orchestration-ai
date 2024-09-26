
import {
  Flex,
  Spinner,
  Tr,
  Td,
  Text,
} from "@chakra-ui/react";

export function TableLoading({ data = [] }) {
  return (
    <>
      <Tr>
        <Td colSpan="100">
          <Flex gap={4}>
            <Spinner display={"inline-block"} size={"sm"} />
            <Text textAlign={"center"}>Loading...</Text>
          </Flex>
        </Td>
      </Tr>
      {data && data.map(
        (item, i) =>
          i >= 1 && (
            <Tr key={i}>
              <Td colSpan="100">&nbsp;</Td>
            </Tr>
          )
      )}
    </>
  );
}