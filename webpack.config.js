const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//fast refresh que nao reseta as insformações dos estados dos componentes
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

//Definido variavel de ambiente para executar scripts salvos no package.json
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",

  //atributo de configuração para visualizar erros no navegador de uma forma legivel
  devtool: isDevelopment ? "eval-source-map" : "source-map",

  devServer: {
    //informando ao devServer onde esta o conteudo estatico da aplicação
    contentBase: path.resolve(__dirname, "public"),
    hot: true,
  },

  //Direcionando arquivo de entrada
  entry: path.resolve(__dirname, "src", "index.tsx"),

  //direcionando arquivo de saida
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  resolve: {
    // informando os tipos de arquivos a serem lidos
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  //injetando script no arquivo html diretamente, sem necessidade de inserir o scrip manualmente
  plugins: [
    //caso esteja em modo de produção ira retornar um boolean false,
    // prejudicando a leita de plugins do webpack
    // foi adiciona no fim desse array um filtro para excluir valores booleanos nulos
    isDevelopment && new ReactRefreshWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ].filter(Boolean),

  // informa como a aplicação deve se comportar  ao importar tipos de arquivos especificos
  module: {
    rules: [
      {
        test: /\.(j|t)sx$/,
        exclude: /node_modules/,
        //integração entre babel(coverte cod js para cod js em que os navegadores entendam)
        //sendo assim, quando o webpack converter arquivos .jsx sera realizado com o babel-loader
        use: {
          loader: "babel-loader",
          //Adicionando fast Refresh React ao loader
          options: {
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },

      //Adicionando arquivos css ao webpack
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      //Adicionando e configurando webpack para entender o Sass
      // com a lib node-sass e sass-loader
      // ( pré-processador css)
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
