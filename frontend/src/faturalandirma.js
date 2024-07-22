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

const fatura_listesi = [
  [1, 123, "Başak", "Güney", "345", "yok", "13.10.2024", "2600"],
  [2, 234, "Ali", "Kaya", "456", "yok", "01.03.2024", "1500"],
];

const Faturalandirma = () => {
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
                      <MenuItem>Ad</MenuItem>
                      <MenuItem>Tarih</MenuItem>
                      <MenuItem>Tutar</MenuItem>
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
                      <Input onChange={handlePersonelIdChange}></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Hasta ID</InputLeftAddon>
                      <Input onChange={handlePersonelIdChange}></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Ad</InputLeftAddon>
                      <Input onChange={handlePersonelIdChange}></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Soyad</InputLeftAddon>
                      <Input onChange={handlePersonelIdChange}></Input>
                    </InputGroup>
                  </Stack>
                  <Stack spacing={4} direction="row">
                    <InputGroup size="sm">
                      <InputLeftAddon>TCNO</InputLeftAddon>
                      <Input onChange={handlePersonelIdChange}></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Sigorta Bilgisi</InputLeftAddon>
                      <Input onChange={handlePersonelIdChange}></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Tarih</InputLeftAddon>
                      <Input onChange={handlePersonelIdChange}></Input>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>Tutar</InputLeftAddon>
                      <Input onChange={handlePersonelIdChange}></Input>
                    </InputGroup>
                  </Stack>
                </Stack>
                <Button colorScheme="teal" size="sm" w="10%">
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
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {fatura_listesi.map((tuple) => {
                        return (
                          <Tr>
                            {tuple != null
                              ? tuple.map((element) => {
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

export default Faturalandirma;
