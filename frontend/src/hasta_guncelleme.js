import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  ChakraProvider,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  MenuButton,
  MenuItem,
  Menu,
  MenuList,
} from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

import {
  Input,
  InputLeftAddon,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import HastaSistemi from "./hasta_sistemi";

const HastaGuncelleme = () => {
  const [hastaId, setHastaId] = useState();
  const [hasta, setHasta] = useState();
  const [sigorta, setSigorta] = useState();
  const [came, setCame] = useState(false);
  function hasta_getir() {
    axios
      .post("http://localhost:8080/hasta_getir", { hastaId: hastaId })
      .then((response) => {
        console.log(response.data);
        setHasta(response.data);
        setCame(true);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function hasta_guncelle() {
    axios
      .post("http://localhost:8080/hasta_guncelle", {
        hastaId: hastaId,
        sigorta: sigorta,
      })
      .then((response) => {})
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  return (
    <ChakraProvider>
      <Tabs>
        <TabList>
          <Tab>Yönetim Bilgi Sistemi</Tab>
          <Tab>Hasta Sistemi</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Stack spacing={8} direction="row">
              <Accordion defaultIndex={[0]} allowMultiple w="25%">
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "#F56565", color: "white" }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Doktorlar
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <a
                      href="/randevu_takvimi"
                      style={{ "text-decoration": "underline" }}
                    >
                      Randevu Takvimi
                    </a>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "#F56565", color: "white" }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Hizmet Personeli
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <a
                      href="/hasta_ataması"
                      style={{ "text-decoration": "underline" }}
                    >
                      Hasta Ataması
                    </a>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "#F56565", color: "white" }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        İdari Personel
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <a
                      href="/envanter_goruntuleme"
                      style={{ "text-decoration": "underline" }}
                    >
                      Envanter Görüntüleme
                    </a>
                  </AccordionPanel>
                  <AccordionPanel pb={4}>
                    <a
                      href="/faturalandirma"
                      style={{ "text-decoration": "underline" }}
                    >
                      Faturalandırma
                    </a>
                  </AccordionPanel>
                  <AccordionPanel pb={4}>
                    <AccordionItem>
                      <h2>
                        <AccordionButton
                          _expanded={{ bg: "#F56565", color: "white" }}
                        >
                          <Box as="span" flex="1" textAlign="left">
                            Bilgi Güncelleme
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <a
                          href="/doktor_bilgi_guncelleme"
                          style={{ "text-decoration": "underline" }}
                        >
                          Doktor Bilgi Güncelleme
                        </a>
                      </AccordionPanel>
                      <AccordionPanel pb={4}>
                        <a
                          href="/hasta_guncelleme"
                          style={{ "text-decoration": "underline" }}
                        >
                          Hasta
                        </a>
                      </AccordionPanel>
                    </AccordionItem>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "#F56565", color: "white" }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Bölümler
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <a
                      href="/bolum_bilgileri"
                      style={{ "text-decoration": "underline" }}
                    >
                      Bölüm Bilgileri
                    </a>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <Stack spacing={4} direction="column">
                <Stack spacing={4} direction="row" w="50%">
                  <InputGroup size="sm">
                    <InputLeftAddon>Hasta ID</InputLeftAddon>
                    <Input
                      onChange={(event) => {
                        setHastaId(event.target.value);
                      }}
                    ></Input>
                  </InputGroup>
                  <Button
                    colorScheme="teal"
                    size="sm"
                    w="25%"
                    onClick={hasta_getir}
                  >
                    Getir
                  </Button>
                </Stack>
                <br></br>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Hasta ID</Th>
                        <Th>TCNO</Th>
                        <Th>Ad</Th>
                        <Th>Soyad</Th>
                        <Th>Sigorta Bilgisi</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {came ? (
                        <Tr>
                          {hasta != null
                            ? Object.values(hasta[0]).map((element, i) => {
                                // Log the type and value of the element
                                console.log(
                                  "Element type:",
                                  typeof element,
                                  "Value:",
                                  element
                                );

                                if (i === 0 || i === 1 || i === 2 || i === 3) {
                                  // Ensure the element is a valid React child
                                  if (
                                    typeof element === "string" ||
                                    typeof element === "number"
                                  ) {
                                    return <Td key={i}>{element}</Td>;
                                  } else {
                                    return <Td key={i}>Invalid Value</Td>;
                                  }
                                } else if (i === 4) {
                                  return (
                                    <Td key={i}>
                                      <Input
                                        placeholder={String(element)} // Ensure placeholder is a string
                                        size="sm"
                                        onChange={(event) =>
                                          setSigorta(event.target.value)
                                        }
                                      />
                                    </Td>
                                  );
                                }
                              })
                            : null}

                          <Button
                            colorScheme="blue"
                            size="sm"
                            onClick={() => {
                              hasta_guncelle();
                            }}
                          >
                            Güncelle
                          </Button>
                        </Tr>
                      ) : null}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Stack>
            </Stack>
          </TabPanel>
          <TabPanel>
            <HastaSistemi></HastaSistemi>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );
};

export default HastaGuncelleme;
