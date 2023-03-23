<?php

namespace App\Http\Controllers;

use App\Models\Mission;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MissionController extends Controller {

    public function index()
    {
        return response(Mission::all());
    }

    public function store(Request $request)
    {
        return response(Mission::create($request->all()));
    }

    public function show(Mission $mission){
        return response()->json([
            'mission' => $mission
        ]);
    }
 
    public function update(Request $request, Mission $mission){
        $request->validate([
            'description'=>'required',
            'deadline' => 'required',
            'isCompleted' => 'required',
            'completedAt' => 'required',
        ]);
        $mission->fill($request->post())->update();
        return response()->json([
            'message' => 'Item updated successfully'
        ]);
    }

    public function destroy(Mission $mission)
    {
        return response($mission->delete());
    }
}