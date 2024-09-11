<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    // Relationship with employees (Many-to-Many)
    public function employees()
    {
        return $this->belongsToMany(Employee::class, 'employee_project')->withPivot('Description');
    }

    // Relationship with machines (Many-to-Many)
    public function machines()
    {
        return $this->belongsToMany(Machine::class, 'machine_project')->withPivot('Description');
    }

    // Current relationship with products (Many-to-Many)
    public function products()
    {
        return $this->belongsToMany(Product::class, 'project_products')->withPivot('id','quantity');
    }

    // Size belongsTo relationship
    public function productsize()
    {
        return $this->belongsTo(Size::class,'size_id');
    }

    // Color belongsTo relationship
    public function productcolor()
    {
        return $this->belongsTo(Color::class,'color_id');
    }

    // Project status belongsTo relationship
    public function projectstatus()
    {
        return $this->belongsTo(ProjectStatus::class,'status_id');
    }
}
