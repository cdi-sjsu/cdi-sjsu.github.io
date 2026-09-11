const projects = [
  {
    title: "VGA Game Of Life",
    image: "public/images/GOLCoverPic.png",
    github: "https://github.com/Thnk189/tt_um_SummerTT_HDL",
    description:
      "Verilog implementation of John Conway`s Game Of Life, Submitted to TinyTapeout in November 2025. This was my first ever Verilog project :D, this was done as a project for Engineering Success",
  },
  {
    title: "8-bit Bi-Directional Shift Register + Magnitude Comparator",
    image: "public/images/under-construction-warning.jpg",
    github: "https://github.com/Thnk189/shift-reg-magn-comp",
    description:
      "A Bi-Directional shift register that takes in a serial input from a switch that can be shifted left or right [dictated by another switch :D] This 8 bit value from the shift register is then compared to a magnitude comparator look in the verilog code man this description getting to long :skull:",
  },
  {
    title: "Template",
    image: "public/images/under-construction-warning.jpg",
    github: "#",
    description:
      "Hey Nic this is Nic making this template because I know you gonna forget how to get to this file its the ONE of TWO self explanatory java script files, just copy paste BOI!!!",
  },
  {
    title: "Memrister Emulator",
    image: "public/images/under-construction-warning.jpg",
    github: "https://github.com/Thnk189/Memrister-Verilog-Behav-Model",
    description:
      "This is a digital behavoiral Model of a memrister, currently in a semi-complete state it utilizes look up tables for the chosen windowing function as well as a built in sine generator to give a simulated frequency. This project will soon have Analog capabilities through the use of a DAC with measurments to translate 8 bit digital signals into actual analog voltage, current, and resistance values. ",
  },
];

const gallery = document.querySelector("[data-project-gallery]");

if (gallery) {
  const screenImage = gallery.querySelector("[data-project-image]");
  const title = gallery.querySelector("[data-project-title]");
  const description = gallery.querySelector("[data-project-description]");
  const github = gallery.querySelector("[data-project-github]");
  const count = gallery.querySelector("[data-project-count]");
  const backButton = gallery.querySelector("[data-project-back]");
  const nextButton = gallery.querySelector("[data-project-next]");

  let currentProject = 0;

  function showProject(projectNumber) {
    currentProject = (projectNumber + projects.length) % projects.length;
    const project = projects[currentProject];

    screenImage.src = project.image;
    screenImage.alt = `${project.title} preview`;
    title.textContent = project.title;
    description.textContent = project.description;
    github.href = project.github;
    github.setAttribute("aria-label", `Open ${project.title} on GitHub`);
    count.textContent = `PROJECT ${
      String(currentProject + 1).padStart(2, "0")
    }`;
  }

  backButton.addEventListener("click", () => showProject(currentProject - 1));
  nextButton.addEventListener("click", () => showProject(currentProject + 1));

  showProject(0);
}
