$(document).ready(function() {
  // Saat form submit
  $('#reportForm').on('submit', function(e) {
      e.preventDefault();

      // Ambil data dari form
      let formData = {
          name: $('#Name').val(),
          date: $('#date').val(),
          id_project: $('#idProject').val(),
          product: $('#product').val(),
          description: $('#description').val(),
          _token: $('input[name="_token"]').val()
      };

      // Kirim data dengan AJAX
      $.ajax({
          url: '/reports',
          type: 'POST',
          data: formData,
          success: function(response) {
              // Tambahkan data baru ke table tanpa reload halaman
              let newRow = `
                  <tr>
                      <td>${response.id}</td>
                      <td>${response.name}</td>
                      <td>${response.date}</td>
                      <td>${response.id_project}</td>
                      <td>${response.product}</td>
                      <td>${response.description}</td>
                  </tr>
              `;
              $('#reportTableBody').append(newRow);

              // Reset form setelah submit
              $('#reportForm')[0].reset();
          },
          error: function(xhr) {
              alert('Gagal menyimpan data.');
          }
      });
  });

  // Load data ke table saat halaman pertama kali di-load
  function loadReports() {
      $.ajax({
          url: '/reports',
          type: 'GET',
          success: function(reports) {
              reports.forEach(report => {
                  let newRow = `
                      <tr>
                          <td>${report.id}</td>
                          <td>${report.name}</td>
                          <td>${report.date}</td>
                          <td>${report.id_project}</td>
                          <td>${report.product}</td>
                          <td>${report.description}</td>
                      </tr>
                  `;
                  $('#reportTableBody').append(newRow);
              });
          }
      });
  }

  // Panggil fungsi untuk load data report
  loadReports();
});
