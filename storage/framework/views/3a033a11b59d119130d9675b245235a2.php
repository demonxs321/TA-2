

<?php $__env->startSection('container'); ?>

<div class="container-sc">
    <div class="top-bar">
        <div class="header-wrapper">
        <div class="header-title">
            <h2>Schedule</h2>
        </div>
        <div class="dropdown-top">
            <a href="/schedule" class="active">Schedule</a>
            <a href="">|</a>
            <a href="/project">Project</a>
        </div>
        <div class="user-info">
            <img src="image2.jpg" alt="">
        </div>
        </div>
    </div>  

<section class="timeline-container">
    <div class="timeline-header">
        <h2>Timeline</h2>
        <div>
            <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Project Description
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Project</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="mb-4">
            <select class="form-select" id="projectDropdown" onchange="showProjectDescription()">
                <option value="">-- Select a Project --</option>
                <option value="1">Project 1</option>
                <option value="2">Project 2</option>
                <option value="3">Project 3</option>
            </select>
        </div>
            <div id="description" class="card hidden">
            <div class="card-body">
                <h4 id="projectTitle" class="card-title"></h4>
                <p id="projectDetails" class="card-text"></p>

                <h5 class="mt-4">People, Machines, Dates, and Tasks Involved</h5>
                <div class="table-responsive">
                    <table class="table table-bordered mt-3">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">People</th>
                                <th scope="col">Machines</th>
                                <th scope="col">Date</th>
                                <th scope="col">Task</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                            <!-- Rows will be dynamically inserted here -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>    
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
            <a href="/project"><button class="btn btn-primary">Project View</button></a>
            <select class="btn btn-light" id="monthSelect">
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
            </select>
            <button class="btn btn-success" id="addNewButton" onclick="location.href='project'">Add New</button>
        </div>
    </div>
        <div id="calendar"></div>
</section>

<!-- Modal -->



<script src="/js/scheduleScript.js"></script>



<?php $__env->stopSection(); ?>


<?php echo $__env->make('layouts/main', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\Users\RYZEN\OneDrive\Documents\GitHub\TA-2\resources\views/schedule.blade.php ENDPATH**/ ?>