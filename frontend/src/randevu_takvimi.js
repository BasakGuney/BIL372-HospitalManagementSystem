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
import { useEffect, useState } from "react";
import axios from "axios";

const randevu_listesi = [
  [1, 123, "Başak", "Güney", "345", "yok", "13.10.2024", "14.30"],
  [2, 234, "Ali", "Kaya", "456", "yok", "12.10.2024", "12.30"],
];

const RandevuTakvimi = () => {
  function personeli_getir() {
    axios
      .post("http://localhost:8080/personeli_getir", { personelId: personelId })
      .then((response) => {
        console.log(response.data);
        setRandevuTakvimi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function randevu_filtrele() {
    axios
      .post("http://localhost:8080/randevu_filtrele", {
        personelId: personelId,
        hastaId: chooseHastaId,
        TCNO: chooseTCNO,
        Ad: chooseAd,
        Soyad: chooseSoyad,
        Sigorta: chooseSigorta,
        KayitNo: chooseKayitNo,
        Tarih: chooseTarih,
        Saat: chooseSaat,
      })
      .then((response) => {
        console.log(response.data);
        setRandevuTakvimi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function tarihe_gore_sirala() {
    console.log("hereee");
    axios
      .post("http://localhost:8080/tarihe_gore_sirala", {
        personelId: personelId,
      })
      .then((response) => {
        console.log(response.data);
        setRandevuTakvimi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function saate_gore_sirala() {
    axios
      .post("http://localhost:8080/saate_gore_sirala", {
        personelId: personelId,
      })
      .then((response) => {
        console.log(response.data);
        setRandevuTakvimi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function ada_gore_sirala() {
    axios
      .post("http://localhost:8080/ada_gore_sirala", {
        personelId: personelId,
      })
      .then((response) => {
        console.log(response.data);
        setRandevuTakvimi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function doktor_randevu_iptali(hastaId) {
    axios
      .post("http://localhost:8080/doktor_randevu_iptali", {
        personelId: personelId,
        hastaId: hastaId,
      })
      .then((response) => {
        console.log(response.data);
        setRandevuTakvimi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  const [personelId, setPersonelId] = useState();
  const [randevuTakvimi, setRandevuTakvimi] = useState([]);
  const [chooseAd, setChooseAd] = useState();
  const [chooseSoyad, setChooseSoyad] = useState();
  const [chooseTarih, setChooseTarih] = useState();
  const [chooseSaat, setChooseSaat] = useState();
  const [chooseTCNO, setChooseTCNO] = useState();
  const [chooseHastaId, setChooseHastaId] = useState();
  const [chooseKayitNo, setChooseKayitNo] = useState();
  const [chooseSigorta, setChooseSigorta] = useState();

  const handlePersonelIdChange = (event) => {
    setPersonelId(event.target.value);
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
                    <InputLeftAddon>Personel ID</InputLeftAddon>
                    <Input onChange={handlePersonelIdChange}></Input>
                  </InputGroup>
                  <Button
                    colorScheme="teal"
                    size="sm"
                    w="25%"
                    onClick={personeli_getir}
                  >
                    Getir
                  </Button>
                </Stack>
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
                      <MenuItem onClick={tarihe_gore_sirala}>Tarih</MenuItem>
                      <MenuItem onClick={saate_gore_sirala}>Saat</MenuItem>
                      <MenuItem onClick={ada_gore_sirala}>Ad</MenuItem>
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
                      <InputLeftAddon>Ad</InputLeftAddon>
                      <Input
                        onChange={(event) => setChooseAd(event.target.value)}
                      ></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Soyad</InputLeftAddon>
                      <Input
                        onChange={(event) => setChooseSoyad(event.target.value)}
                      ></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Tarih</InputLeftAddon>
                      <Input
                        onChange={(event) => setChooseTarih(event.target.value)}
                      ></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Saat</InputLeftAddon>
                      <Input
                        onChange={(event) => setChooseSaat(event.target.value)}
                      ></Input>
                    </InputGroup>
                  </Stack>
                  <Stack spacing={4} direction="row">
                    <InputGroup size="sm">
                      <InputLeftAddon>TCNO</InputLeftAddon>
                      <Input
                        onChange={(event) => setChooseTCNO(event.target.value)}
                      ></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Hasta ID</InputLeftAddon>
                      <Input
                        onChange={(event) =>
                          setChooseHastaId(event.target.value)
                        }
                      ></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Sigorta Bilgisi</InputLeftAddon>
                      <Input
                        onChange={(event) =>
                          setChooseSigorta(event.target.value)
                        }
                      ></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Kayıt No</InputLeftAddon>
                      <Input
                        onChange={(event) => {
                          setChooseKayitNo(event.target.value);
                        }}
                      ></Input>
                    </InputGroup>
                  </Stack>
                </Stack>
                <Button
                  colorScheme="teal"
                  size="sm"
                  w="10%"
                  onClick={randevu_filtrele}
                >
                  Getir
                </Button>
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
                        <Th>Kayıt No</Th>
                        <Th>Tarih</Th>
                        <Th>Saat</Th>
                        <Th>Geçerli mi</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {randevuTakvimi.map((tuple) => {
                        return (
                          <Tr>
                            {tuple != null
                              ? Object.values(tuple).map((element) => {
                                  return <Td>{element}</Td>;
                                })
                              : null}
                            <Button
                              colorScheme="red"
                              onClick={(event) => {
                                doktor_randevu_iptali(tuple.Hasta_ID);
                              }}
                            >
                              İptal Et
                            </Button>
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

export default RandevuTakvimi;
