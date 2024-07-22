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
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import reactRouterDom from "react-router-dom";
import {
  Input,
  InputLeftAddon,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const envanter_listesi = [
  [1, "Ağrı Kesici", 70, 1, 0],
  [2, "Plaster", 100, 0, 0],
  [3, "Serum", 150, 1, 0],
];

const EnvanterGoruntuleme = () => {
  const [personelId, setPersonelId] = useState();
  const [randevuTakvimi, setRandevuTakvimi] = useState([]);

  const doktor_randevu_getir = (personelId) => {};

  const handlePersonelIdChange = (event) => {
    setPersonelId(event.target.value);
    console.log(personelId);
  };

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
                          href="/diger_bilgi_guncelleme"
                          style={{ "text-decoration": "underline" }}
                        >
                          Diğer
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
                  <AccordionPanel pb={4}></AccordionPanel>
                </AccordionItem>
              </Accordion>
              <Stack spacing={4} direction="column">
                <Stack w="15%">
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      size="sm"
                      colorScheme="green"
                    >
                      Sırala
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Stok Miktarı</MenuItem>
                      <MenuItem>Malzeme Adı</MenuItem>
                      <MenuItem>Sipariş Durumu</MenuItem>
                    </MenuList>
                  </Menu>
                  <Box
                    as="button"
                    borderRadius="md"
                    bg="#38A169"
                    color="white"
                    px={4}
                    h={8}
                  >
                    Filtrele
                  </Box>
                </Stack>
                <Stack>
                  <Stack spacing={4} direction="row">
                    <InputGroup size="sm">
                      <InputLeftAddon>Malzeme ID</InputLeftAddon>
                      <Input onChange={handlePersonelIdChange}></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Malzeme Adı</InputLeftAddon>
                      <Input onChange={handlePersonelIdChange}></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Stok Miktarı</InputLeftAddon>
                      <Input onChange={handlePersonelIdChange}></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Sipariş Durumu</InputLeftAddon>
                      <Input onChange={handlePersonelIdChange}></Input>
                    </InputGroup>
                  </Stack>
                  <Stack spacing={4} direction="row">
                    <InputGroup size="sm" w="24%">
                      <InputLeftAddon>Sipariş Miktarı</InputLeftAddon>
                      <Input onChange={handlePersonelIdChange}></Input>
                    </InputGroup>
                  </Stack>
                </Stack>
                <Button colorScheme="teal" size="sm" w="10%">
                  Getir
                </Button>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Malzeme ID</Th>
                        <Th>Malzeme Adı</Th>
                        <Th>Stok Miktarı</Th>
                        <Th>Sipariş Durumu</Th>
                        <Th>Sipariş Miktarı</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {envanter_listesi.map((tuple) => {
                        return (
                          <Tr>
                            {tuple != null
                              ? tuple.map((element) => {
                                  return <Td>{element}</Td>;
                                })
                              : null}
                            {tuple != null ? (
                              tuple[3] == 1 ? (
                                <Menu>
                                  <MenuButton
                                    as={Button}
                                    rightIcon={<ChevronDownIcon />}
                                    colorScheme="green"
                                    size="sm"
                                  >
                                    Sipariş Ver
                                  </MenuButton>
                                  <MenuList>
                                    <InputGroup paddingX="2" w="75%" size="sm">
                                      <InputLeftAddon>Miktar:</InputLeftAddon>
                                      <Input />
                                    </InputGroup>
                                    <Stack paddingX="2" paddingY="2">
                                      <Button
                                        colorScheme="blue"
                                        size="sm"
                                        w="25%"
                                      >
                                        Onayla
                                      </Button>
                                    </Stack>
                                  </MenuList>
                                </Menu>
                              ) : null
                            ) : null}
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Stack>
            </Stack>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );
};

export default EnvanterGoruntuleme;
