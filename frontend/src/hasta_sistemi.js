import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  ChakraProvider,
} from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
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

const HastaSistemi = () => {
  return (
    <ChakraProvider>
      <Stack spacing={8} direction="row">
        <Accordion defaultIndex={[0]} allowMultiple w="25%">
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "#F56565", color: "white" }}>
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
      </Stack>
    </ChakraProvider>
  );
};

export default HastaSistemi;
