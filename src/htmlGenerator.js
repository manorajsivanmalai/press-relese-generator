const fs = require('fs-extra');
const { formatDate, cleanFileName } = require('./utils');


// Save HTML to output folder
function saveHtmlFile(htmlContent, title, outputDir) {
    const fileName = cleanFileName(title) + '.html';
    const filePath = `${outputDir}/${fileName}`;
    fs.ensureDirSync(outputDir);
    fs.writeFileSync(filePath, htmlContent);
    return filePath;
}



function generateHtml(title, date,titleAfterHtml,dateParagraph,remainingBlocks, imageHtml) {
    const formattedDate = formatDate(date);
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="icon" href="https://static3.toyotabharat.com/images/favicon.ico">

    <title>${title}
    </title>
    <meta name="description" content="${dateParagraph.replace(/<[^>]+>/g, '').trim()}">
    <meta name="keywords" content="${title}">

    <link href="https://static3.toyotabharat.com/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://static3.toyotabharat.com/css/style.css" rel="stylesheet">
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <style>
        .table-border,
        .table-border>tbody>tr>td,
        .table-border>tbody>tr>th,
        .table-border>tfoot>tr>td,
        .table-border>tfoot>tr>th,
        .table-border>thead>tr>td,
        .table-border>thead>tr>th {
            border: 1px solid black;
        }

        .table tr > td > p{
        margin-bottom: 0;
        }

        @media (max-width: 600px) {
            img.header-logo {
                width: 80% !important;
            }
        }

        .sales-table {
            border-collapse: collapse;
            width: 100%;
        }

        .sales-table td,
        .sales-table th {
            border: 1px solid #333333;
            text-align: center;
            padding: 8px;
            font-size: 17px;
        }

        @media only screen and (max-width: 767px) {
            .press-realese table p {
                font-size: 10px;
            }
  .press-realese table {
                font-size: 10px;
            }
            .more-details-size {
                font-size: 12px;
            }
        }

        tbody.th-width th {
            width: 33%;
        }
    </style>
</head>

<body>
    <!--==========================
      HEADER
      ===========================-->
    <div id="headerContent"></div>

    <!--==========================
      PAGE WRAP
      ===========================-->

    <div class="page-wrap">
        <div class="container-fluid press-realese">
            <div class="row add-mrgtop">
                <ol class="breadcrumb">
                    <li>Home</li>
                    <li>Press Release</li>
                    <li>${ formattedDate }</li>
                </ol>

                <!--==========================
                        NEWS HEADING
                        ===========================-->

                <div class="col-lg-12">
                    <p class="date-post"><i class="clock"></i> Posted on ${formattedDate}</p>
                    <div class="page-header">
                        <h2>${title}</h2>
                         ${titleAfterHtml?titleAfterHtml:''}
                    </div>
                </div>
            </div>

            <!--==========================
                  NEWS ARTICLE
                  ===========================-->

            <div class="row">
                <div class="col-lg-12" id="txtHide">
                ${dateParagraph+imageHtml+remainingBlocks}
                </div>
            </div>
        </div>
        <div id="snav" class="en"></div>
        <footer class="footer add-mrgtop" id="footerContent"></footer>
    </div>
    <script src="https://static3.toyotabharat.com/js/jquery.min.js"></script>
    <script src="https://static3.toyotabharat.com/js/common.js" type="text/javascript"></script>
    <script src="https://static3.toyotabharat.com/js/bootstrap.min.js"></script>
<script> 
           var last = $("table").length;
   
        for (let i = last-4; i < last; i++) {

            if (i != last-1) {
                $($('table')[i]).find('td:nth-child(odd)').css({ "font-weight": "bold" });
            }
        }
        $("table").addClass('table table-bordered');  
        $($("table")[last - 1]).addClass('half-table');
</script>
</body>

</html>`;
}


module.exports = { generateHtml, saveHtmlFile };