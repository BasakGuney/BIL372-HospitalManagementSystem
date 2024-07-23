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

const BolumBilgileri = () => {
  function bolum_listesi_getir() {
    axios
      .post("http://localhost:8080/bolum_listesi_getir")
      .then((response) => {
        console.log(response.data);
        setBolumListesi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function bolum_ada_gore_sirala() {
    console.log("hereee");
    axios
      .post("http://localhost:8080/bolum_ada_gore_sirala")
      .then((response) => {
        console.log(response.data);
        setBolumListesi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function bolum_yatak_gore_sirala() {
    axios
      .post("http://localhost:8080/bolum_yatak_gore_sirala")
      .then((response) => {
        console.log(response.data);
        setBolumListesi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  function bolum_hasta_gore_sirala() {
    axios
      .post("http://localhost:8080/bolum_hasta_gore_sirala")
      .then((response) => {
        console.log(response.data);
        setBolumListesi(response.data);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }

  const [bolumId, setBolumId] = useState();
  const [ad, setAd] = useState();
  const [bolumListesi, setBolumListesi] = useState([]);

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
                  w="35%"
                  onClick={bolum_listesi_getir}
                >
                  Bölüm Bilgilerini Getir
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
                      <MenuItem onClick={bolum_ada_gore_sirala}>Ad</MenuItem>
                      <MenuItem onClick={bolum_hasta_gore_sirala}>
                        Hasta Sayısı
                      </MenuItem>
                      <MenuItem onClick={bolum_yatak_gore_sirala}>
                        Yatak Sayısı
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Stack>
                <br></br>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Bolum Adı</Th>
                        <Th>Yatak Sayısı</Th>
                        <Th>Yatan Hasta Sayısı</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {bolumListesi.map((tuple) => {
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

export default BolumBilgileri;
