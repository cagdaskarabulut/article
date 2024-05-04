const fs = require("fs");
const rootPath = process.env.URL;
const siteName = process.env.SITE_NAME;
const websiteUrl = process.env.URL_WEBSITE;
const websiteUrlRootomain = process.env.URL_WEBSITE_ROOT_DOMAIN;
const isLocal = process.env.IS_LOCAL;

// const siteName = process.env.PROJECT_SITE_NAME;
// const websiteUrl = process.env.PROJECT_URL_WEBSITE;
// const websiteUrlRootomain = process.env.PROJECT_URL_WEBSITE_ROOT_DOMAIN;

const now = getNowWithISOFormat();

function getNowWithISOFormat() {
  const today = new Date();
  return today.toISOString();
}

// function replaceStringForUrlFormat(myString) {
//   myString = myString.replace(/ /g, "-");
//   myString = myString.replace(/'/g, "");
//   myString = myString.replace(/"/g, "");
//   myString = myString.replace(/\//g, "");
//   myString = myString.replace(/&/g, "");
//   myString = myString.replace("(", "");
//   myString = myString.replace(")", "");
//   myString = myString.replace(/ó/g, "o");
//   myString = myString.replace(",", "");
//   return myString;
// }

function addUrlToSitemapList(existingList, newUrl) {
  existingList = `${existingList}
<url>
<loc>
${websiteUrl}/${newUrl}
</loc>
<lastmod>
${now}
</lastmod>
<changefreq>
daily
</changefreq>
<priority>
0.7
</priority>
</url>
`;
  return existingList;
}

function addUrlToRobotsList(existingList, newUrl) {
  existingList = `${existingList}Allow: /${newUrl}
`;
  return existingList;
}

function generateFinalRobotsTxtFile(robotsTxtFileSource) {
  let result = `# *
User-agent: *
${robotsTxtFileSource}
Disallow: /AdminPanel
Disallow: /AdminPanelLogin
# Sitemaps
Sitemap: ${websiteUrl}/sitemap.xml`;
  return result;
}

function generateFinalColorsScssFile() {
//   let result = `
// @import "../styles/colors.scss";
// @import "../styles/mixins.scss";

// body {
//   background-color: $containerBackgroundDesktop !important;
// }
// `;
let result = `
$color0: rgb(255, 255, 255);
$color1: rgb(0, 0, 0);
$color2: rgba(0, 0, 0, 0.6);
$color3: rgb(0, 147, 233);
$color4: rgb(211, 70, 0);
$color5: rgb(220, 220, 220);
$color6: #2F7D31;
$color7: rgb(230, 244, 231);
$color8: rgb(242, 242, 242);


$PanelContainerColor: $color0;
$containerBackgroundDesktop: $color8;
$containerBackgroundHeader: $color8;
$background: $color8;
$font: $color3;
$textFieldErrorBorderColor: rgb(255, 0, 0);

$firstButtonFontColor: $color1;
$firstButtonBackgroundColor: $color7;
$firstButtonBorderColor: $color6;
$firstButtonFontColorHover: $color0;

$secondButtonFontColor: $color0;
$secondButtonBackgroundColor: $color6;
$secondButtonBorderColor: $color7;

$thirdButtonFontColor: $color0;
$thirdButtonBackgroundColor: $color4;
$thirdButtonBorderColor: $color0;

$fourthButtonFontColor: $color0;
$fourthButtonBackgroundColor: $color3 ;
$fourthButtonBorderColor: $color3 ;

`;
  return result;
}

function generateFinalGlobalsScssFile() {
    let result = `
  @import "../styles/colors.scss";
  @import "../styles/mixins.scss";
  `;
    return result;
  }
  


function generateFinalSitemapXmlFile(SitemapXmlFileSource) {
  let result = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${SitemapXmlFileSource}
</urlset>
`;
  return result;
}

function addStaticValuesIntoSitemapList() {
  let result = `
<url>
<loc>
${websiteUrl}
</loc>
<lastmod>
${now}
</lastmod>
<changefreq>
daily
</changefreq>
<priority>
0.7
</priority>
</url>
<url>
<loc>
${websiteUrlRootomain}
</loc>
<lastmod>
${now}
</lastmod>
<changefreq>
daily
</changefreq>
<priority>
0.7
</priority>
</url>
`;
  return result;
}

async function generateRobotsTxtAndSitemapXml() {
  if (isLocal == "false") {
    // let colorsScss = generateFinalColorsScssFile();
    //     let globalsScss = generateFinalGlobalsScssFile();
    // fs.writeFileSync("src/styles/colors.scss", colorsScss);
    //     fs.writeFileSync("src/app/globals.scss", globalsScss);

    await fetch(process.env.URL + "/api/article/article_project_auto_generate_files", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((dataList) => {
        //- add auto generated urls
        dataList?.file?.rows.map((activeFile, index) => {
          if(activeFile?.project_name == siteName){
            fs.writeFileSync(activeFile?.file_path, activeFile?.file_content);
          }
        });
      });

    let dynamicRobotsTxtFields = "";
    let dynamicSitemapFields = addStaticValuesIntoSitemapList();
    await fetch(process.env.URL + "/api/article/list_url", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((dataList) => {
        //- add auto generated urls
        dataList?.article_url_list?.rows.map((article, index) => {
          dynamicRobotsTxtFields = addUrlToRobotsList(
            dynamicRobotsTxtFields,
            article.url
          );
          dynamicSitemapFields = addUrlToSitemapList(
            dynamicSitemapFields,
            article.url
          );
        });

        //-generate final files to store
        let robotsTxt = generateFinalRobotsTxtFile(dynamicRobotsTxtFields);
        let sitemapXml = generateFinalSitemapXmlFile(dynamicSitemapFields);
        

        //-create physical files
        fs.writeFileSync("public/robots.txt", robotsTxt);
        fs.writeFileSync("public/sitemap.xml", sitemapXml);
        
      });

      



  }
}

module.exports = generateRobotsTxtAndSitemapXml;