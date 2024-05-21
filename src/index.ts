import * as http from 'http';
import * as url from 'url';


const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url as string, true).query;
    const percentage = parseInt(queryObject.percentage as string) || 50; 

    
    const generateTable = (percentage: number): string => {
        const gridSize = 10;
        const totalCells = gridSize * gridSize;
        const cellsToHide = Math.floor(totalCells * (percentage / 100));

        let tableHTML = '<table border="3" cellpadding="5" cellspacing="0">';
        tableHTML += '<tr><th>😀</th>'; 
        for (let i = 1; i <= gridSize; i++) {
            tableHTML += `<th>${i}</th>`; 
        }
        tableHTML += '</tr>';

        const hiddenCells: { [key: string]: boolean } = {};
        let hiddenCount = 0;
        while (hiddenCount < cellsToHide) {
            const row = Math.floor(Math.random() * gridSize) + 1;
            const col = Math.floor(Math.random() * gridSize) + 1;
            const key = `${row}-${col}`;
            if (!hiddenCells[key]) { 
                hiddenCells[key] = true;
                hiddenCount++;
            }
        }

        for (let i = 1; i <= gridSize; i++) {
            tableHTML += '<tr>';
            tableHTML += `<th>${i}</th>`;
            for (let j = 1; j <= gridSize; j++) {
                const key = `${i}-${j}`;
                const cellValue = hiddenCells[key] ? '' : i * j;
                tableHTML += `<td>${cellValue}</td>`;
            }
            tableHTML += '</tr>';
        }

        tableHTML += '</table>';

        return tableHTML;
    };

    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

   
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Daugybos Lentelė</title>");
    res.write("</head>");
    res.write("<body>");
    res.write(`
        <h1>Daugybos lentelė su ${percentage}% paslėptų skaičių</h1>
        <form method="get" action="/">
            <label for="percentage">Pasirinkite procentą:</label>
            <select name="percentage" id="percentage">
                <option value="10" ${percentage === 10 ? 'selected' : ''}>10%</option>
                <option value="30" ${percentage === 30 ? 'selected' : ''}>30%</option>
                <option value="50" ${percentage === 50 ? 'selected' : ''}>50%</option>
            </select>
            <button type="submit">Generuoti</button>
        </form>
    `);
    res.write("<hr>")
    res.write(generateTable(percentage));
    res.write("</body>");
    res.write("</html>");
    res.end();
});


server.listen(2999, 'localhost')
