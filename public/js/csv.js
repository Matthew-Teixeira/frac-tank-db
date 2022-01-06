const downloadBtn = document.querySelector('#csv-btn');

downloadBtn.addEventListener('click', tableToCSV);

function tableToCSV() {
    let csvData = [];

    let rows = document.getElementsByTagName('tr');
    for(let i = 0; i < rows.length; i++){

        let cols = rows[i].querySelectorAll('td, th');
        
        // Stores each csv row data
        let csvRow = []
        for(let j = 0; j < cols.length; j++){
            // Get the text data of each cell of
            // a row and push it to csvrow
            csvRow.push(cols[j].innerHTML);
        }
        //combine each column value with comma
        csvData.push(csvRow.join(","));

    }
    //combine each row data with new line character
    csvData = csvData.join('\n');

    downloadCSVFile(csvData);
}

function downloadCSVFile(csv_data){

    // Create CSV file object and feed our data into
    CSVFile = new Blob([csv_data], { type: "text/csv" });

    // Create to temporary link to initiate download process
    let temp_link = document.createElement('a');

    // Download csv file
    temp_link.download = "GfG.csv";
    let url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    //Automaticly click the link to trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
}