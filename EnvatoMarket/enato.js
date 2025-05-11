const addPhoto = () => {
  const imgUrl = "https://undsgn.com/uncode/homepages/classic-agency/";
  const resimAlaniDOM = document.getElementById('photo');
  const imgDOM = document.createElement("img");
  imgDOM.setAttribute("height", 415);
  imgDOM.setAttribute("width", 738);
  imgDOM.setAttribute("src", imgUrl)
  resimAlaniDOM.appendChild(imgDOM);
}