<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\ProjectWorkforce; // Import ProjectWorkforce model
use Illuminate\Http\Request;

class ReportController extends Controller
{
    // Store reports (existing functionality)
    public function store(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'name' => 'required',
            'date' => 'required|date',
            'id_project' => 'required',
            'product' => 'required',
            'description' => 'required'
        ]);

        // Simpan ke database
        $report = Report::create($validated);

        // Kembalikan response JSON untuk AJAX
        return response()->json($report);
    }

    // Fetch all reports (existing functionality)
    public function index()
    {
        // Mengambil semua report dari database
        $reports = Report::all();
        return response()->json($reports);
    }

    // Method to handle form submission on the utility page and calculate work count
    public function showUtilityPage(Request $request)
    {
        // Get the selected month and year, default to the current month and year if not provided
        $month = $request->input('month', date('m'));
        $year = $request->input('year', date('Y'));

        // 1. Retrieve the original reports from the Report model (if needed)
        $reports = Report::whereYear('date', $year)
                         ->whereMonth('date', $month)
                         ->get();

        // 2. Retrieve workforce data from project_workforces table based on the selected month and year
        // Group by workforce and count the tasks for each employee during the selected month
        $workReport = ProjectWorkforce::with('workforce') // Eager load the workforce relationship
            ->selectRaw('workforce_id, COUNT(*) as work_count') // Count the number of workdays/tasks
            ->whereYear('date', $year)
            ->whereMonth('date', $month)
            ->groupBy('workforce_id') // Group by employee
            ->get();

        // 3. Pass both the workReport (work count) and the original reports to the utility view
        return view('utility', [
            'workReport' => $workReport,
            'reports' => $reports // Original reports data
        ]);
    }
}
