let reportCounter = 1; // Untuk nomor urut laporan

document.getElementById("reportForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const Name = document.getElementById("Name").value;
    const date = document.getElementById("date").value;
    const idProject = document.getElementById("idProject").value;
    const product = document.getElementById("product").value;
    const description = document.getElementById("description").value;

    // Tambahkan data ke dalam tabel
    const tableBody = document.getElementById("reportTableBody");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <th scope="row">${reportCounter}</th>
        <td>${Name}</td>
        <td>${date}</td>
        <td>${idProject}</td>
        <td>${product}</td>
        <td>${description}</td>
      `;

    tableBody.appendChild(newRow);

    reportCounter++; // Tambahkan nomor urut

    // Reset form setelah submit
    document.getElementById("reportForm").reset();
});
