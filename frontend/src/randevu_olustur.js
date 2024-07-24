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
  Card,
  CardHeader,
  Heading,
  CardBody,
  StackDivider,
  Text,
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
import HastaSistemi from "./hasta_sistemi";
import MainPage from "./main_page";

const randevu_listesi = [
  [1, 123, "Başak", "Güney", "345", "yok", "13.10.2024", "14.30"],
  [2, 234, "Ali", "Kaya", "456", "yok", "12.10.2024", "12.30"],
];

const RandevuOlustur = () => {
  function randevu_saat_getir() {
    axios
      .post("http://localhost:8080/randevu_saat_getir", { bolum: bolum })
      .then((response) => {
        console.log(response.data);
        setSaatListesi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function hasta_kaydet() {
    axios
      .post("http://localhost:8080/hasta_kaydet", {
        TCNO: TCNO,
        ad: ad,
        soyad: soyad,
        sigorta: sigorta,
      })
      .then((response) => {
        console.log(response.data);
        setHastaId(response.data[0].Hasta_ID);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function hasta_randevu_olustur(doktorId, saat) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    axios
      .post("http://localhost:8080/hasta_randevu_olustur", {
        doktorId: doktorId,
        hastaId: hastaId,
        tarih: formattedDate,
        saat: saat,
        gecerli: 1,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  const [bolum, setBolum] = useState();
  const [saatListesi, setSaatListesi] = useState([]);
  const [TCNO, setTCNO] = useState();
  const [ad, setAd] = useState();
  const [soyad, setSoyad] = useState();
  const [sigorta, setSigorta] = useState();
  const [hastaId, setHastaId] = useState();
  return (
    <ChakraProvider>
      <Tabs defaultIndex={1}>
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
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack spacing={8} direction="row">
              <Accordion defaultIndex={[0]} allowMultiple w="25%">
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "#F56565", color: "white" }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        İşlemler
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <a
                      href="/randevu_listesi"
                      style={{ "text-decoration": "underline" }}
                    >
                      Randevu Listesi
                    </a>
                  </AccordionPanel>
                  <AccordionPanel pb={4}>
                    <a
                      href="/hasta_randevu_olustur"
                      style={{ "text-decoration": "underline" }}
                    >
                      Randevu Oluştur
                    </a>
                  </AccordionPanel>
                  <AccordionPanel pb={4}>
                    <a
                      href="/hasta_fatura"
                      style={{ "text-decoration": "underline" }}
                    >
                      Faturalar
                    </a>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Stack spacing={4} direction="row">
                <Card>
                  <CardHeader>
                    <Heading size="md">Hasta Bilgileri</Heading>
                  </CardHeader>

                  <CardBody w="400px">
                    <Stack divider={<StackDivider />} spacing="4">
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          TCNO
                        </Heading>
                        <Input
                          size="md"
                          variant="flushed"
                          onChange={(event) => setTCNO(event.target.value)}
                        />
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Ad
                        </Heading>
                        <Input
                          variant="flushed"
                          onChange={(event) => setAd(event.target.value)}
                        />
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Soyad
                        </Heading>
                        <Input
                          variant="flushed"
                          onChange={(event) => setSoyad(event.target.value)}
                        />
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Sigorta Bilgisi
                        </Heading>
                        <Input
                          variant="flushed"
                          onChange={(event) => setSigorta(event.target.value)}
                        />
                      </Box>
                      <Box>
                        <Button colorScheme="blue" onClick={hasta_kaydet}>
                          Kaydet
                        </Button>
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
                <Stack direction="column">
                  <Stack direction="row">
                    <InputGroup size="sm" w="400px">
                      <InputLeftAddon>Bölüm</InputLeftAddon>
                      <Input
                        onChange={(event) => setBolum(event.target.value)}
                      ></Input>
                    </InputGroup>
                    <Button
                      colorScheme="teal"
                      size="sm"
                      w="15%"
                      onClick={randevu_saat_getir}
                    >
                      Getir
                    </Button>
                  </Stack>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Doktor ID</Th>
                          <Th>Doktor Adı</Th>
                          <Th>Doktor Soyadı</Th>
                          <Th>Bölüm</Th>
                          <Th>İletişim</Th>
                          <Th>Çalışma Saatleri</Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {saatListesi.map((tuple) => {
                          return (
                            <Tr>
                              {tuple != null
                                ? Object.values(tuple).map((element) => {
                                    return <Td>{element}</Td>;
                                  })
                                : null}
                              <Button
                                colorScheme="green"
                                onClick={(event) =>
                                  hasta_randevu_olustur(
                                    tuple.Doktor_ID,
                                    tuple.Saat
                                  )
                                }
                              >
                                Seç
                              </Button>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Stack>
              </Stack>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );
};

export default RandevuOlustur;
