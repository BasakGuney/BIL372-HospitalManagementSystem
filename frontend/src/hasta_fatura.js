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
import HastaSistemi from "./hasta_sistemi";
import MainPage from "./main_page";

const randevu_listesi = [
  [1, 123, "Başak", "Güney", "345", "yok", "13.10.2024", "14.30"],
  [2, 234, "Ali", "Kaya", "456", "yok", "12.10.2024", "12.30"],
];

const HastaFatura = () => {
  const [TCNO, setTCNO] = useState();
  const [faturalar, setFaturalar] = useState([]);

  function faturalari_getir() {
    axios
      .post("http://localhost:8080/faturalari_getir", { TCNO: TCNO })
      .then((response) => {
        console.log(response.data);
        setFaturalar(response.data);
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
                      href="/randevu_olustur"
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

              <Stack spacing={4} direction="column">
                <Stack spacing={4} direction="row">
                  <InputGroup size="sm">
                    <InputLeftAddon>TCNO</InputLeftAddon>
                    <Input
                      w="400px"
                      onChange={(event) => {
                        setTCNO(event.target.value);
                      }}
                    ></Input>
                  </InputGroup>
                  <Button
                    colorScheme="teal"
                    size="sm"
                    onClick={faturalari_getir}
                  >
                    Getir
                  </Button>
                </Stack>

                <br></br>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Tarih</Th>
                        <Th>Tutar</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {faturalar.map((tuple) => {
                        return (
                          <Tr>
                            {tuple != null
                              ? Object.values(tuple).map((element, index) => {
                                  if (index == 0)
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
              </Stack>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );
};

export default HastaFatura;
