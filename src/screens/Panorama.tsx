import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Linking,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { buscarEventos } from "../storage/storage";
import { EventoEnergia } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@eventos_energia";

export default function PanoramaGeral() {
  const [eventos, setEventos] = useState<EventoEnergia[]>([]);
  const [guiaAberto, setGuiaAberto] = useState(false);
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  useEffect(() => {
    carregarEventos();
  }, [isFocused]);

  const carregarEventos = async () => {
    const dados = await buscarEventos();
    setEventos(dados);
  };

  const renderItem = ({ item }: { item: EventoEnergia }) => (
    <View style={styles.card}>

      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.titulo}>{item.local}</Text>

      <Text>⏱️ Tempo sem energia: {item.tempoInterrupcao}</Text>
      <Text>💸 Prejuízos: {item.prejuizos}</Text>
      <Text>
        {" "}
        💬 Recomendações:{" "}
        {item.recomendacoes || "Nenhuma recomendação registrada"}
      </Text>
      <Text style={styles.data}>🗓️ {formatarData(item.data)}</Text>
    </View>
  );

  const abrirLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Erro ao abrir link:", err)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Panorama Geral ⚡</Text>

      {guiaAberto ? (
        <ScrollView style={styles.guiaContainer}>
          <TouchableOpacity
            style={styles.fecharGuia}
            onPress={() => setGuiaAberto(false)}
          >
            <Text style={styles.fecharGuiaTexto}>✕ Fechar Guia</Text>
          </TouchableOpacity>

          <Text style={styles.tituloGuia}>
            Guia de Segurança em Emergências 🛡️
          </Text>

          {/* Cortes de Energia */}
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>
              💡 Cortes de Energia Prolongados
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Kit básico:</Text> Lanterna (não
              use velas), pilhas, rádio portátil, power bank
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Alimentos:</Text> Mantenha comida
              não perecível e água (4L/pessoa/dia)
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Proteja aparelhos:</Text> Desligue
              equipamentos sensíveis da tomada
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Geladeira:</Text> Mantenha fechada
              - alimentos duram 4h se cheia, 2h se meia
            </Text>
            <TouchableOpacity
              onPress={() => abrirLink("https://www.aneel.gov.br/consumidor")}
            >
              <Text style={styles.link}>Direitos do consumidor (ANEEL)</Text>
            </TouchableOpacity>
          </View>

          {/* Enchentes e Alagamentos */}
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>🌊 Enchentes e Alagamentos</Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Evite áreas alagadas:</Text> 15 cm
              de água em movimento podem derrubar uma pessoa
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Desligue a energia:</Text> Se a
              água atingir tomadas ou disjuntores
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Prepare um kit emergencial:</Text>{" "}
              Documentos, medicamentos e alimentos não perecíveis em saco
              plástico
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Sinalize perigo:</Text> Marque
              áreas profundas com galhos ou objetos visíveis
            </Text>
            <TouchableOpacity
              onPress={() =>
                abrirLink("https://www.defesacivil.gov.br/emergencia/enchentes")
              }
            >
              <Text style={styles.link}>
                Guia completo de prevenção a enchentes
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tempestades e Raios */}
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>⚡ Tempestades e Raios</Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Regra 30-30:</Text> Se contar
              menos de 30 segundos entre raio e trovão, busque abrigo
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Posição segura:</Text> Agache com
              pés juntos se pego ao ar livre
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Proteja eletrônicos:</Text> Use
              filtros de linha e estabilizadores
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Evite:</Text> Telefones fixos,
              chuveiros e torneiras durante tempestades
            </Text>
            <TouchableOpacity
              onPress={() => abrirLink("https://www.inpe.br/raios/")}
            >
              <Text style={styles.link}>
                Monitoramento de raios em tempo real
              </Text>
            </TouchableOpacity>
          </View>

          {/* Deslizamentos de Terra */}
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>⛰️ Deslizamentos de Terra</Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Sinais de alerta:</Text>{" "}
              Rachaduras no solo, portas que emperram, árvores inclinadas
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Plano de fuga:</Text> Identifique
              rotas seguras e pontos altos
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Após chuva forte:</Text> Evite
              encostas por 48 horas
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Prevenção:</Text> Não corte
              vegetação em encostas e mantenha calhas limpas
            </Text>
            <TouchableOpacity
              onPress={() =>
                abrirLink("https://www.defesacivil.sp.gov.br/alertas/")
              }
            >
              <Text style={styles.link}>
                Mapa de áreas de risco em seu estado
              </Text>
            </TouchableOpacity>
          </View>

          {/* Emergências Médicas */}
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>🩺 Emergências Médicas</Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Kit primeiros socorros:</Text>{" "}
              Inclua termômetro, antisséptico, remédios essenciais
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Contatos:</Text> Tenha números de
              emergência visíveis (192 SAMU, 193 Bombeiros)
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Choque elétrico:</Text> Nunca
              toque na vítima sem desligar a energia
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Parada cardíaca:</Text> Aprenda
              RCP - 100-120 compressões/minuto no centro do peito
            </Text>
            <TouchableOpacity
              onPress={() => abrirLink("https://www.cvv.org.br/")}
            >
              <Text style={styles.link}>
                Centro de Valorização da Vida (188)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Ventos Fortes */}
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>💨 Ventos Fortes e Furacões</Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Prepare sua casa:</Text> Fixe
              objetos soltos, podar galhos altos
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Zona segura:</Text> Cômodo interno
              sem janelas (banheiro, corredor)
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Se estiver dirigindo:</Text> Pare
              longe de árvores e postes, fique no carro
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Após a tempestade:</Text> Cuidado
              com fios caídos e estruturas danificadas
            </Text>
            <TouchableOpacity
              onPress={() => abrirLink("https://alert-as.inmet.gov.br/")}
            >
              <Text style={styles.link}>Alertas meteorológicos oficiais</Text>
            </TouchableOpacity>
          </View>

          {/* Dicas Gerais */}
          <View style={[styles.card, { borderLeftColor: "#e74c3c" }]}>
            <Text style={styles.cardTitulo}>🛟 Dicas de Sobrevivência</Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Comunicação:</Text> Tenha rádio
              AM/FM a pilhas para informações oficiais
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Documentos:</Text> Mantenha cópias
              digitais em nuvem e físicas à prova d'água
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Vizinhos:</Text> Crie rede de
              apoio no seu bairro
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Treinamento:</Text> Pratique rotas
              de fuga com sua família 2x/ano
            </Text>
            <Text style={styles.cardItem}>
              • <Text style={styles.destaque}>Kit 72h:</Text> Mochila com água,
              comida, remédios, rádio, lanternas e documentos
            </Text>
            <TouchableOpacity
              onPress={() =>
                abrirLink(
                  "https://www.defesacivil.gov.br/publicacoes-e-manuais"
                )
              }
            >
              <Text style={styles.link}>
                Manuais de sobrevivência da Defesa Civil
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.nota}>
            Estas recomendações são preventivas. Em caso de emergência real,
            ligue imediatamente para:
            {"\n"}🚑 SAMU (192) | 🚒 Bombeiros (193) | 🛡️ Defesa Civil (199) |
            👮 Polícia (190)
          </Text>
        </ScrollView>
      ) : (
        <>
          <FlatList
            data={eventos}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={
              <Text style={styles.vazio}>Nenhum evento registrado ainda.</Text>
            }
          />

          <TouchableOpacity
            style={[styles.botao, { backgroundColor: "#16a085" }]}
            onPress={() => setGuiaAberto(true)}
          >
            <Text style={styles.botaoTexto}>Abrir Guia de Segurança</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate("Localizacao")}
          >
            <Text style={styles.botaoTexto}>+ Novo Evento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, { backgroundColor: "red" }]}
            onPress={async () => {
              await AsyncStorage.removeItem(STORAGE_KEY);
              carregarEventos();
              Alert.alert(
                "Storage RESETADO",
                "Todos os eventos foram apagados!"
              );
              console.log("[PANORAMA] STORAGE COMPLETAMENTE LIMPO!");
            }}
          >
            <Text style={styles.botaoTexto}>RESETAR TUDO</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

function formatarData(dataISO: string) {
  const data = new Date(dataISO);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}-${mes}-${ano}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fefefe",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ececec",
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
  },
  cardTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "700",
  },
  data: {
    fontSize: 13,
    color: "#555",
    marginTop: 6,
  },
  vazio: {
    textAlign: "center",
    color: "#999",
    marginTop: 30,
    fontStyle: "italic",
  },
  botao: {
    backgroundColor: "#0077cc",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  // Estilos para o guia de segurança
  guiaContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  fecharGuia: {
    alignSelf: "flex-end",
    padding: 8,
    marginBottom: 10,
  },
  fecharGuiaTexto: {
    color: "#e74c3c",
    fontWeight: "bold",
  },
  tituloGuia: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2c3e50",
    textAlign: "center",
  },
  cardGuia: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#3498db",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTituloGuia: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
  },
  cardItemGuia: {
    fontSize: 15,
    marginBottom: 8,
    color: "#34495e",
    lineHeight: 22,
  },
  destaque: {
    fontWeight: "bold",
    color: "#2c3e50",
  },
  linkGuia: {
    color: "#2980b9",
    marginTop: 10,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  notaGuia: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 10,
    marginBottom: 20,
    color: "#7f8c8d",
    textAlign: "center",
    lineHeight: 20,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
  },
  cardItem: {
    fontSize: 15,
    marginBottom: 8,
    color: "#34495e",
    lineHeight: 22,
  },
  link: {
    color: "#2980b9",
    marginTop: 10,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  nota: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 10,
    marginBottom: 20,
    color: "#7f8c8d",
    textAlign: "center",
  },
});
