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
import HastaSistemi from "./hasta_sistemi";

const Faturalandirma = () => {
  const [personelId, setPersonelId] = useState();
  const [faturaListesi, setFaturaListesi] = useState([]);
  const [faturaId, setFaturaId] = useState();
  const [hastaId, setHastaId] = useState();
  const [ad, setAd] = useState();
  const [soyad, setSoyad] = useState();
  const [TCNO, setTCNO] = useState();
  const [sigorta, setSigorta] = useState();
  const [tarih, setTarih] = useState();
  const [tutar, setTutar] = useState();

  function fatura_listesi_getir() {
    axios
      .post("http://localhost:8080/fatura_listesi_getir")
      .then((response) => {
        console.log(response.data);
        setFaturaListesi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  const handlePersonelIdChange = (event) => {
    setPersonelId(event.target.value);
    console.log(personelId);
  };

  function guncel_tutar_hesapla() {
    axios
      .post("http://localhost:8080/guncel_tutar_hesapla")
      .then((response) => {
        console.log(response.data);
        setFaturaListesi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function fatura_ada_gore_sirala() {
    axios
      .post("http://localhost:8080/fatura_ada_gore_sirala", {})
      .then((response) => {
        console.log(response.data);
        setFaturaListesi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function fatura_tarihe_gore_sirala() {
    axios
      .post("http://localhost:8080/fatura_tarihe_gore_sirala", {})
      .then((response) => {
        console.log(response.data);
        setFaturaListesi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function fatura_tutara_gore_sirala() {
    axios
      .post("http://localhost:8080/fatura_tutara_gore_sirala", {})
      .then((response) => {
        console.log(response.data);
        setFaturaListesi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function fatura_filtrele() {
    axios
      .post("http://localhost:8080/fatura_filtrele", {
        faturaId: faturaId,
        hasataId: hastaId,
        ad: ad,
        soyad: soyad,
        TCNO: TCNO,
        sigorta: sigorta,
        tarih: tarih,
        tutar: tutar,
      })
      .then((response) => {
        console.log(response.data);
        setFaturaListesi(response.data);
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
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={fatura_listesi_getir}
                  w="15%"
                >
                  Fatura Listesini Getir
                </Button>
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
                      <MenuItem onClick={fatura_ada_gore_sirala}>Ad</MenuItem>
                      <MenuItem onClick={fatura_tarihe_gore_sirala}>
                        Tarih
                      </MenuItem>
                      <MenuItem onClick={fatura_tutara_gore_sirala}>
                        Tutar
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
                      <InputLeftAddon>Fatura ID</InputLeftAddon>
                      <Input
                        onChange={(event) => setFaturaId(event.target.value)}
                      ></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Hasta ID</InputLeftAddon>
                      <Input
                        onChange={(event) => setHastaId(event.target.value)}
                      ></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Ad</InputLeftAddon>
                      <Input
                        onChange={(event) => setAd(event.target.value)}
                      ></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Soyad</InputLeftAddon>
                      <Input
                        onChange={(event) => setSoyad(event.target.value)}
                      ></Input>
                    </InputGroup>
                  </Stack>
                  <Stack spacing={4} direction="row">
                    <InputGroup size="sm">
                      <InputLeftAddon>TCNO</InputLeftAddon>
                      <Input
                        onChange={(event) => setTCNO(event.target.value)}
                      ></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Sigorta Bilgisi</InputLeftAddon>
                      <Input
                        onChange={(event) => setSigorta(event.target.value)}
                      ></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Tarih</InputLeftAddon>
                      <Input
                        onChange={(event) => setTarih(event.target.value)}
                      ></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Tutar</InputLeftAddon>
                      <Input
                        onChange={(event) => setTutar(event.target.value)}
                      ></Input>
                    </InputGroup>
                  </Stack>
                </Stack>
                <Button
                  colorScheme="teal"
                  size="sm"
                  w="10%"
                  onClick={fatura_filtrele}
                >
                  Getir
                </Button>
                <br></br>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Fatura ID</Th>
                        <Th>Hasta ID</Th>
                        <Th>Ad</Th>
                        <Th>Soyad</Th>
                        <Th>TCNO</Th>
                        <Th>Sigorta Bilgisi</Th>
                        <Th>Tarih</Th>
                        <Th>Tutar</Th>
                        <Th>Güncel Tutar</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {faturaListesi.map((tuple) => {
                        return (
                          <Tr>
                            {tuple != null
                              ? Object.values(tuple).map((element, index) => {
                                  if (index == 6)
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
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={guncel_tutar_hesapla}
                  w="20%"
                >
                  Güncel Tutar Hesapla
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

export default Faturalandirma;
