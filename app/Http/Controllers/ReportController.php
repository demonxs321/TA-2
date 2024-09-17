<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
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

    public function index()
    {
        // Mengambil semua report dari database
        $reports = Report::all();
        return response()->json($reports);
    }
}
