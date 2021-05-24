module.exports={
    // hash: publicPath ""
    // history: publicPath "/"
    publicPath:"",
    assetsDir:"static",
    outputDir:"dist",
    indexPath:"index.html",
    devServer:{
        proxy:{
            "/api":{
                target:"http://localhost:3000",
                ws:true,
                changeOrigin:true
            }
        }
    }
}