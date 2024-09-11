$(document).ready(function () {
    $("#calendar").fullCalendar({
        header: {
            left: "prev,next today",
            center: "title",
            right: "month,agendaWeek,agendaDay",
        },
        defaultDate: "2024-03-14",
        editable: true,
        buttonText: {
            today: "Today",
            month: "Month View",
            week: "Week View",
            day: "Day View",
        },
        events: function (start, end, timezone, callback) {
            $.ajax({
                url: "/api/project/", // Replace with your actual API endpoint
                type: "GET",
                dataType: "json",
                success: function (response) {
                    var events = [];
                    console.log(response); // Log the response to see its structure

                    // Assuming projects are nested under response.projects
                    var projects = response.projects;

                    $.each(projects, function (index, project) {
                        console.log(project); // Log each project to inspect its structure
                        console.log(project.name); // Log project.name to see if it's accessible

                        // Push event data to the events array
                        events.push({
                            title: project.name,
                            start: project.start_date,
                            end: project.end_date,
                        });
                    });
                    callback(events);
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data from API: ", error);
                },
            });
        },
        dayClick: function (date) {
            $("#eventStart").val(date.format("YYYY-MM-DD"));
            $("#eventEnd").val(date.format("YYYY-MM-DD"));
            $("#addEventModal").modal("show");
        },
    });
});

// Change calendar month based on dropdown selection
$("#monthSelect").change(function () {
    var selectedMonth = $(this).val();
    var currentYear = new Date().getFullYear();
    var date = new Date(currentYear, selectedMonth, 1);

    $("#calendar").fullCalendar("gotoDate", date);
});

// Initialize datepicker
// $(".datepicker").datepicker({
//         dateFormat: 'yy-mm-dd'
// });

// Show modal on button click
// $('#addNewButton').click(function() {
//     $('#addEventModal').modal('show');
// });

// Save event
// $('#saveEventButton').click(function() {
//     var eventTitle = $('#eventTitle').val();
//     var eventStart = $('#eventStart').val();
//     var eventEnd = $('#eventEnd').val();
//     var eventColor = $('#eventColor').val();
//     var eventTextColor = $('#eventTextColor').val();

// if(eventTitle && eventStart) {
//     $('#calendar').fullCalendar('renderEvent', {
//         title: eventTitle,
//         start: eventStart,
//         end: eventEnd,
//         color: eventColor,
//         textColor: eventTextColor
//     }, true); // stick the event

//     $('#addEventModal').modal('hide');
//     $('#addEventForm')[0].reset();
// } else {
//         alert("Please enter the required details.");
// }
// });
const projects = [
    {
        id: 1,
        name: "Project 1: Website Development",
        description:
            "This project involves creating a responsive website using HTML, CSS, and JavaScript.",
        details: [
            {
                person: "John Doe",
                machine: "Machine A",
                date: "2024-09-15",
                task: "HTML & CSS Development",
            },
            {
                person: "Jane Smith",
                machine: "Machine B",
                date: "2024-09-16",
                task: "JavaScript Development",
            },
        ],
    },
    {
        id: 2,
        name: "Project 2: Mobile App Development",
        description:
            "This project focuses on developing a cross-platform mobile app for personal finance management.",
        details: [
            {
                person: "Michael Johnson",
                machine: "Machine C",
                date: "2024-09-17",
                task: "Frontend Development",
            },
            {
                person: "Jane Smith",
                machine: "Machine D",
                date: "2024-09-18",
                task: "Backend API Development",
            },
        ],
    },
    {
        id: 3,
        name: "Project 3: Data Analysis with Python",
        description:
            "This project involves analyzing large datasets using Python, Pandas, and Matplotlib.",
        details: [
            {
                person: "John Doe",
                machine: "Machine E",
                date: "2024-09-19",
                task: "Data Cleaning",
            },
            {
                person: "Michael Johnson",
                machine: "Machine F",
                date: "2024-09-20",
                task: "Data Visualization",
            },
        ],
    },
];

function showProjectDescription() {
    const dropdown = document.getElementById("projectDropdown");
    const selectedValue = dropdown.value;

    if (selectedValue === "") {
        document.getElementById("description").classList.add("hidden");
        return;
    }

    // Cari proyek yang sesuai dengan nilai yang dipilih dari dropdown
    const selectedProject = projects.find(
        (project) => project.id == selectedValue
    );

    // Jika proyek ditemukan, tampilkan data proyek, orang, mesin, tanggal, dan pekerjaan
    if (selectedProject) {
        document.getElementById("projectTitle").innerText =
            selectedProject.name;
        document.getElementById("projectDetails").innerText =
            selectedProject.description;

        // Kosongkan isi tabel sebelumnya
        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";

        // Loop untuk menampilkan data orang, mesin, tanggal, dan pekerjaan ke bawah
        selectedProject.details.forEach((detail) => {
            const row = document.createElement("tr");

            const personCell = document.createElement("td");
            const machineCell = document.createElement("td");
            const dateCell = document.createElement("td");
            const taskCell = document.createElement("td");

            personCell.innerText = detail.person;
            machineCell.innerText = detail.machine;
            dateCell.innerText = detail.date;
            taskCell.innerText = detail.task;

            row.appendChild(personCell);
            row.appendChild(machineCell);
            row.appendChild(dateCell);
            row.appendChild(taskCell);

            tableBody.appendChild(row);
        });

        // Tampilkan deskripsi
        document.getElementById("description").classList.remove("hidden");
    }
}
