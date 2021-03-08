const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  devServer: {
    //informando ao devServer onde esta o conteudo estatico da aplicação
    contentBase: path.resolve(__dirname, "public"),
  },

  //Direcionando arquivo de entrada
  entry: path.resolve(__dirname, "src", "index.jsx"),

  //direcionando arquivo de saida
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  resolve: {
    // informando os tipos de arquivos a serem lidos
    extensions: [".js", ".jsx"],
  },
  //injetando script no arquivo html diretamente, sem necessidade de inserir o scrip manualmente
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],

  // informa como a aplicação deve se comportar  ao importar tipos de arquivos especificos
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        //integração entre babel(coverte cod js para cod js em que os navegadores entendam) e webpack
        //sendo assim, quando converter arquivos .jsx sera realizado com o babel-loader
        use: "babel-loader",
      },
    ],
  },
};
