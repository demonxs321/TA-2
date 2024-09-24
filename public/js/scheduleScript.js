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
// Array of projects
// Sample data for projects
// Sample project data
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

// Global variable to track the currently selected project and edited row
let currentEditRow = null;

// Function to show the selected project's description and data
function showProjectDescription() {
    const dropdown = document.getElementById("projectDropdown");
    const selectedValue = dropdown.value;

    if (selectedValue === "") {
        document.getElementById("description").classList.add("hidden");
        return;
    }

    // Find the selected project
    const selectedProject = projects.find(
        (project) => project.id == selectedValue
    );

    if (selectedProject) {
        document.getElementById("projectTitle").innerText =
            selectedProject.name;
        document.getElementById("projectDetails").innerText =
            selectedProject.description;

        // Clear previous table content
        document.getElementById("employeeTableBody").innerHTML = "";
        document.getElementById("machineTableBody").innerHTML = "";

        // Populate the Employee Table
        selectedProject.details.forEach((detail, index) => {
            const employeeRow = document.createElement("tr");

            employeeRow.innerHTML = `
                <td>${detail.person}</td>
                <td>${detail.date}</td>
                <td>${detail.task}</td>
                <td><button class="btn btn-sm btn-primary" onclick="openEditForm(this, 'employee', ${index})">Edit</button></td>
            `;
            document
                .getElementById("employeeTableBody")
                .appendChild(employeeRow);

            // Populate the Machine Table
            const machineRow = document.createElement("tr");

            machineRow.innerHTML = `
                <td>${detail.machine}</td>
                <td>${detail.date}</td>
                <td>${detail.task}</td>
                <td><button class="btn btn-sm btn-primary" onclick="openEditForm(this, 'machine', ${index})">Edit</button></td>
            `;
            document.getElementById("machineTableBody").appendChild(machineRow);
        });

        // Display the description card
        document.getElementById("description").classList.remove("hidden");

        // Show only the selected table
        showSelectedTable();
    }
}

// Function to show only the selected table (Employee or Machine)
function showSelectedTable() {
    const selectedTable = document.getElementById("dataSelector").value;
    const employeeTable = document.getElementById("employeeTable");
    const machineTable = document.getElementById("machineTable");

    if (selectedTable === "employee") {
        employeeTable.classList.remove("hidden");
        machineTable.classList.add("hidden");
    } else if (selectedTable === "machine") {
        employeeTable.classList.add("hidden");
        machineTable.classList.remove("hidden");
    }
}

// Show the Add Row form
function showAddRowForm() {
    document.getElementById("addRowFormContainer").classList.remove("hidden");
}

// Function to add a new row to the currently displayed table
function addRow() {
    const personMachine = document.getElementById("newPersonMachine").value;
    const date = document.getElementById("newDate").value;
    const task = document.getElementById("newTask").value;

    if (personMachine === "" || date === "" || task === "") {
        alert("Please fill out all fields.");
        return;
    }

    const selectedTable = document.getElementById("dataSelector").value;
    const projectId = document.getElementById("projectDropdown").value;
    const selectedProject = projects.find((project) => project.id == projectId);

    if (selectedProject) {
        const newDetail =
            selectedTable === "employee"
                ? { person: personMachine, date: date, task: task }
                : { machine: personMachine, date: date, task: task };

        selectedProject.details.push(newDetail);

        // Re-render the table to reflect the new row
        showProjectDescription();
    }

    // Clear the form fields and hide the form
    document.getElementById("newPersonMachine").value = "";
    document.getElementById("newDate").value = "";
    document.getElementById("newTask").value = "";
    document.getElementById("addRowFormContainer").classList.add("hidden");
}

// Cancel adding a new row
function cancelAddRow() {
    document.getElementById("addRowFormContainer").classList.add("hidden");
    document.getElementById("newPersonMachine").value = "";
    document.getElementById("newDate").value = "";
    document.getElementById("newTask").value = "";
}

// Function to save the changes to the project array
function saveChanges() {
    const selectedProjectId = document.getElementById("projectDropdown").value;
    const selectedProject = projects.find(
        (project) => project.id == selectedProjectId
    );

    if (selectedProject) {
        alert("Changes have been saved successfully!");
    } else {
        alert("Please select a project first.");
    }
}

// Function to open the edit form with the data from the selected row
function openEditForm(button, tableType, rowIndex) {
    currentEditRow = { rowIndex, tableType }; // Store the row index and table type being edited

    // Find the row being edited
    const row = button.closest("tr");
    const cells = row.getElementsByTagName("td");

    // Populate the edit form fields with the current row's data
    document.getElementById("editPersonMachine").value = cells[0].innerText;
    document.getElementById("editDate").value = cells[1].innerText;
    document.getElementById("editTask").value = cells[2].innerText;

    // Show the edit form container
    document.getElementById("editFormContainer").classList.remove("hidden");
}

// Save the changes made in the edit form
function saveEdit() {
    const editPersonMachine =
        document.getElementById("editPersonMachine").value;
    const editDate = document.getElementById("editDate").value;
    const editTask = document.getElementById("editTask").value;

    // Ensure all fields have been filled
    if (!editPersonMachine || !editDate || !editTask) {
        alert("Please fill out all fields before saving.");
        return;
    }

    // Find the row to be updated
    if (currentEditRow) {
        const tableBody =
            currentEditRow.tableType === "employee"
                ? document.getElementById("employeeTableBody")
                : document.getElementById("machineTableBody");

        const row = tableBody.children[currentEditRow.rowIndex];
        const cells = row.getElementsByTagName("td");

        // Update the row in the DOM with the new values
        cells[0].innerText = editPersonMachine;
        cells[1].innerText = editDate;
        cells[2].innerText = editTask;

        // Update the data in the projects array
        const projectId = document.getElementById("projectDropdown").value;
        const selectedProject = projects.find(
            (project) => project.id == projectId
        );

        if (selectedProject) {
            const detailIndex = currentEditRow.rowIndex;
            if (currentEditRow.tableType === "employee") {
                selectedProject.details[detailIndex].person = editPersonMachine;
                selectedProject.details[detailIndex].date = editDate;
                selectedProject.details[detailIndex].task = editTask;
            } else if (currentEditRow.tableType === "machine") {
                selectedProject.details[detailIndex].machine =
                    editPersonMachine;
                selectedProject.details[detailIndex].date = editDate;
                selectedProject.details[detailIndex].task = editTask;
            }
        }

        // Clear and hide the edit form
        document.getElementById("editFormContainer").classList.add("hidden");
        document.getElementById("editPersonMachine").value = "";
        document.getElementById("editDate").value = "";
        document.getElementById("editTask").value = "";

        // Alert success
        alert("Changes have been saved successfully!");
    }
}
// Cancel editing and hide the edit form
function cancelEdit() {
    document.getElementById("editFormContainer").classList.add("hidden");
    document.getElementById("editPersonMachine").value = "";
    document.getElementById("editDate").value = "";
    document.getElementById("editTask").value = "";
}
