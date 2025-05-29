import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { salvarEvento } from "../storage/storage";
import { EventoEnergia } from "../types";
import { v4 as uuidv4 } from "uuid";

export default function RecomendacoesScreen() {
  const [abaAtiva, setAbaAtiva] = useState<"formulario" | "seguranca">(
    "formulario"
  );
  const [recomendacoes, setRecomendacoes] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  // const { local, tempoInterrupcao, prejuizos } = route.params || {};
  const { local, tempoInterrupcao, prejuizos, titulo } = route.params || {};

  // Verificar se os parâmetros foram recebidos
  if (!local || !tempoInterrupcao || prejuizos === undefined || !titulo) {
    Alert.alert("Erro", "Dados incompletos");
    navigation.goBack();
    return null;
  }

  const salvarEIrParaPanorama = async () => {
    setLoading(true);

    const novoEvento: EventoEnergia = {
      id: uuidv4(),
      titulo,
      local,
      tempoInterrupcao,
      prejuizos: prejuizos || "0",
      recomendacoes: recomendacoes.trim(),
      data: new Date().toISOString(),
    };

    try {
      await salvarEvento(novoEvento);
      navigation.reset({
        index: 0,
        routes: [{ name: "Panorama" }],
      });
    } catch (error) {
      console.error("Erro ao salvar:", error);
      Alert.alert("Erro", "Não foi possível salvar o evento, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const abrirLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Erro ao abrir link:", err)
    );
  };

  return (
    <View style={styles.container}>
      {/* Abas de Navegação */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            abaAtiva === "formulario" && styles.tabAtiva,
          ]}
          onPress={() => setAbaAtiva("formulario")}
        >
          <Text
            style={[
              styles.tabText,
              abaAtiva === "formulario" && styles.tabTextAtiva,
            ]}
          >
            Suas Recomendações
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            abaAtiva === "seguranca" && styles.tabAtiva,
          ]}
          onPress={() => setAbaAtiva("seguranca")}
        >
          <Text
            style={[
              styles.tabText,
              abaAtiva === "seguranca" && styles.tabTextAtiva,
            ]}
          >
            Dicas de Segurança
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo das Abas */}
      {abaAtiva === "formulario" ? (
        <View style={styles.conteudo}>
          <Text style={styles.titulo}>Recomendações ✏️</Text>
          <Text style={styles.label}>
            O que pode ser feito para evitar ou minimizar esses problemas?
          </Text>

          <TextInput
            style={[styles.input, styles.textArea]}
            value={recomendacoes}
            onChangeText={setRecomendacoes}
            placeholder="Campo não obrigatório"
            placeholderTextColor="#999"
            multiline
            textAlignVertical="top"
            autoFocus
          />

          <TouchableOpacity
            style={[
              styles.botao,
              loading && styles.botaoDesabilitado, // Apenas loading desabilita
            ]}
            onPress={salvarEIrParaPanorama}
            disabled={loading} // Apenas loading desabilita
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.botaoTexto}>Salvar e ver panorama ➜</Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.conteudoScroll}>
          <Text style={styles.tituloSeguranca}>
            Guia Completo de Segurança em Emergências 🛡️
          </Text>
          <Text style={styles.descricao}>
            Informações essenciais para proteger você e sua família em diversas
            situações de risco:
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#f0f4f7",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  tabAtiva: {
    borderBottomWidth: 3,
    borderBottomColor: "#0077cc",
    backgroundColor: "#e1f0fa",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  tabTextAtiva: {
    color: "#0077cc",
    fontWeight: "bold",
  },
  conteudo: {
    flex: 1,
    padding: 16,
  },
  conteudoScroll: {
    padding: 16,
    paddingBottom: 30,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  tituloSeguranca: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2c3e50",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: "#444",
  },
  descricao: {
    fontSize: 16,
    marginBottom: 20,
    color: "#34495e",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    minHeight: 150,
  },
  botao: {
    backgroundColor: "#0077cc",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoDesabilitado: {
    backgroundColor: "#aaccff",
    opacity: 0.7,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#f8f9fa",
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
  destaque: {
    fontWeight: "bold",
    color: "#2c3e50",
  },
});
