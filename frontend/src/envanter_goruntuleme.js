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
import { useState, useEffect } from "react";
import axios from "axios";
import HastaSistemi from "./hasta_sistemi";

const envanter_listesi = [
  [1, "Ağrı Kesici", 70, 1, 0],
  [2, "Plaster", 100, 0, 0],
  [3, "Serum", 150, 1, 0],
];

const EnvanterGoruntuleme = () => {
  const [envanterListesi, setEnvanterListesi] = useState([]);
  const [malzemeId, setMalzemeId] = useState();
  const [malzemeAdi, setMalzemeAdi] = useState();
  const [stokMiktari, setStokMiktari] = useState();
  const [siparisMalzemeId, setSiparisMalzemeId] = useState();
  const [siparisMiktari, setSiparisMiktari] = useState();
  const [siparisDurumu, setSiparisDurumu] = useState();
  const [siparisListesi, setSiparisListesi] = useState([]);

  function envanter_getir() {
    axios
      .post("http://localhost:8080/envanter_getir")
      .then((response) => {
        console.log(response.data);
        setEnvanterListesi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function envanter_filtrele() {
    axios
      .post("http://localhost:8080/envanter_filtrele", {
        malzemeId: malzemeId,
        malzemeAdi: malzemeAdi,
        stokMiktari: stokMiktari,
        siparisDurumu: siparisDurumu,
      })
      .then((response) => {
        console.log(response.data);
        setEnvanterListesi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function envanter_ada_gore_sirala() {
    axios
      .post("http://localhost:8080/envanter_ada_gore_sirala", {})
      .then((response) => {
        console.log(response.data);
        setEnvanterListesi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function stok_miktari_gore_sirala() {
    axios
      .post("http://localhost:8080/stok_miktari_gore_sirala", {})
      .then((response) => {
        console.log(response.data);
        setEnvanterListesi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function siparis_ver() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    axios
      .post("http://localhost:8080/siparis_ver", {
        malzemeId: siparisMalzemeId,
        tarih: year + "-" + month + "-" + day,
        siparisMiktari: siparisMiktari,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function siparis_listesi_getir() {
    axios
      .post("http://localhost:8080/siparis_listesi_getir")
      .then((response) => {
        console.log(response.data);
        setSiparisListesi(response.data);
      })
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
                <Stack w="15%">
                  <Button colorScheme="blue" size="sm" onClick={envanter_getir}>
                    Envanteri Getir
                  </Button>
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
                      <MenuItem onClick={stok_miktari_gore_sirala}>
                        Stok Miktarı
                      </MenuItem>
                      <MenuItem onClick={envanter_ada_gore_sirala}>
                        Malzeme Adı
                      </MenuItem>
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
                      <Input
                        onChange={(event) => {
                          setMalzemeId(event.target.value);
                        }}
                      ></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Malzeme Adı</InputLeftAddon>
                      <Input
                        onChange={(event) => {
                          setMalzemeAdi(event.target.value);
                        }}
                      ></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Stok Miktarı</InputLeftAddon>
                      <Input
                        onChange={(event) => {
                          setStokMiktari(event.target.value);
                        }}
                      ></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Sipariş Durumu</InputLeftAddon>
                      <Input
                        onChange={(event) => {
                          setSiparisDurumu(event.target.value);
                        }}
                      ></Input>
                    </InputGroup>
                  </Stack>
                </Stack>
                <Button
                  colorScheme="teal"
                  size="sm"
                  w="10%"
                  onClick={envanter_filtrele}
                >
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

                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {envanterListesi.map((tuple) => {
                        return (
                          <Tr>
                            {tuple != null
                              ? Object.values(tuple).map((element) => {
                                  return <Td>{element}</Td>;
                                })
                              : null}
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
                <br></br>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={siparis_listesi_getir}
                  w="20%"
                >
                  Sipariş Listesini Getir
                </Button>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Malzeme ID</Th>
                        <Th>Malzeme Adı</Th>
                        <Th>Stok Miktarı</Th>
                        <Th>Sipariş Miktarı</Th>
                        <Th>Tarih</Th>

                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {siparisListesi.map((tuple) => {
                        return (
                          <Tr>
                            {tuple != null
                              ? Object.values(tuple).map((element, index) => {
                                  if (index == 4)
                                    return (
                                      <Td>
                                        {
                                          ("" + element)
                                            .toString()
                                            .split("T")[0]
                                        }
                                      </Td>
                                    );
                                  else return <Td>{element}</Td>;
                                })
                              : null}
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Stack spacing={4} direction="row">
                  <InputGroup size="sm" w="25%">
                    <InputLeftAddon>Malzeme ID</InputLeftAddon>
                    <Input
                      onChange={(event) => {
                        setSiparisMalzemeId(event.target.value);
                      }}
                    ></Input>
                  </InputGroup>
                  <InputGroup size="sm" w="25%">
                    <InputLeftAddon>Miktar</InputLeftAddon>
                    <Input
                      onChange={(event) => {
                        setSiparisMiktari(event.target.value);
                      }}
                    ></Input>
                  </InputGroup>
                </Stack>
                <Button
                  colorScheme="green"
                  size="sm"
                  w="10%"
                  onClick={siparis_ver}
                >
                  Sipariş Ver
                </Button>
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

export default EnvanterGoruntuleme;
