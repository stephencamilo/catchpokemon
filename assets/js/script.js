$(document).ready(function () {
  $('#buscar').click(function () {
    var buscar = $('#buscar-input').val();
    window.location.href = "http://" + window.location.hostname + "/pokemon/" + buscar;
  });
});