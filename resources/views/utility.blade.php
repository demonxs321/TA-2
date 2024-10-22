@extends('layouts/main')

@section('container')

<div class="container-cs">
    <div class="top-bar">
        <div class="header-wrapper">
            <div class="header-title">
                <h2>Utility Page</h2>
            </div>
            <div class="dropdown-top"></div>
            <div class="user-info">
                <img src="image2.jpg" alt="">
            </div>
        </div>
    </div>  

    <!-- @Utility, start -->
    <div class="row row-cols-2 row-cols-md-2 g-3">
        <div class="col">
            <h3>Machine</h3>
            <div class="container">
                <table id="machine-utility-table" class="table table-responsive table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Project</th>
                            <th scope="col">Machine</th>
                            <th scope="col">Date</th>
                            <th scope="col">Task</th>
                        </tr>
                    </thead>
                    <tbody id="machine-utility-table-body">
                        <!-- Data from the database will be inserted here -->
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col">
            <h3>Employee</h3>
            <div class="container">
                <table id="employee-utility-table" class="table table-responsive table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Project</th>
                            <th scope="col">Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Task</th>
                        </tr>
                    </thead>
                    <tbody id="employee-utility-table-body">
                        <!-- Data from the workforce database will be inserted here -->
                        @if(isset($workReport) && $workReport->isNotEmpty())
                            @foreach($workReport as $report)
                            <tr>
                                <!-- Check if workforce relationship exists before accessing its properties -->
                                <td>{{ $report->workforce ? $report->workforce->id : 'No ID' }}</td>
                                <td>{{ $report->project_id }}</td>
                                <td>{{ $report->workforce ? $report->workforce->name : 'No Name' }}</td>
                                <td>{{ $report->date }}</td>
                                <td>{{ $report->task }}</td>
                            </tr>
                            @endforeach
                        @else
                            <tr>
                                <td colspan="5">No workforce data available for the selected month.</td>
                            </tr>
                        @endif
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <br />
    <div class="row row-cols-3 row-cols-md-2 g-3">
        <div class="col">
            <h3>Report</h3>
            <div class="container">
                <form id="reportForm">
                    @csrf
                    <div class="mb-3">
                        <label for="Name">Name</label>
                        <input type="text" class="form-control" id="Name" required>
                    </div>
                    <div class="mb-3">
                        <label for="tanggal">Date</label>
                        <input type="date" class="form-control" id="date" required>
                    </div>
                    <div class="mb-3">
                        <label for="project">ID Project</label>
                        <input type="text" class="form-control" id="idProject" required>
                    </div>
                    <div class="mb-3">
                        <label for="product">Product</label>
                        <input type="text" class="form-control" id="product" required>
                    </div>
                    <div class="mb-3">
                        <label for="deskripsi">Description</label>
                        <textarea class="form-control" id="description" rows="2" required></textarea>
                    </div>    
                    <button type="submit" id="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        <div class="col">
            <h3>Utility Table</h3>
            <div class="container">
                <table id="report-utility-table" class="table table-responsive table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">ID Project</th>
                            <th scope="col">Product</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody id="reportTableBody">
                        <!-- Data dari AJAX akan dimasukkan di sini -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <br />
    <div class="row row-cols-4 row-cols-md-2 g-3">
        <div class="col">
            <h3>Employee Report</h3>
            <form method="GET" action="{{ route('utility') }}">
                <div class="form-group">
                    <label for="month">Pilih Bulan</label>
                    <select id="month" name="month" class="form-control">
                        <option value="1">Januari</option>
                        <option value="2">Februari</option>
                        <option value="3">Maret</option>
                        <option value="4">April</option>
                        <option value="5">Mei</option>
                        <option value="6">Juni</option>
                        <option value="7">Juli</option>
                        <option value="8">Agustus</option>
                        <option value="9">September</option>
                        <option value="10">Oktober</option>
                        <option value="11">November</option>
                        <option value="12">Desember</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Lihat Laporan</button>
            </form>

            <!-- Ensure the $workReport variable is defined before using it -->
            @if(isset($workReport) && $workReport->isNotEmpty())
            <div class="table-responsive mt-5">
                <table class="table table-striped text-center">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Jumlah Bekerja Selama Bulan</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($workReport as $report)
                        <tr>
                            <td>{{ $report->workforce ? $report->workforce->name : 'No Name' }}</td>
                            <td>{{ $report->work_count }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            @else
                <p>No reports available for the selected month.</p>
            @endif
        </div>
    </div>

    <script src="/js/utilityScript.js"></script>
    <!-- @Utility, end -->

@endsection
