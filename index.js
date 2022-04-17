// selecting the form which have data-multi-step tag
const multiStepform = document.querySelector("[data-multi-step]")
// cause we need array but got NodeList
const formSteps = [...multiStepform.querySelectorAll("[data-step]")]
// selecting element-object which contains active class.
let currentStep = formSteps.find((step) => step.classList.contains("active"))
/**
 * NOTE: use findIndex and add data-step as flag instead prop:value pair
 *       then step 1 will be index 0 and so on.
 *       No need for accessing .dataset.step property
 */
// cause it returns string
currentStep = parseInt(currentStep?.dataset.step)
// so by default step one is active
// currentStep = currentStep != 1 ? 1 : currentStep
showCurrentStep()
function incCurrentStepByN(byN) {
  currentStep += byN
  // 3 is max step and 0 is min step
  return currentStep > 0 && 3 > currentStep
}
function showCurrentStep() {
  formSteps.forEach((ele) =>
    // 2nd arg true will add active and false will remove
    ele.classList.toggle(
      "active",
      ele?.dataset.step === currentStep.toString()
      // parseInt(ele?.dataset.step) === currentStep
    )
  )
}
/*
 adding click event to every element in form
  not just element but click anywhere inside
  the form it will listen and run the function
*/
multiStepform.addEventListener("click", (e) => {
  // increment current step if data-next clicked
  e.target.matches("[data-next]") && incCurrentStepByN(1)
  // decrement current step if data-previous clicked
  e.target.matches("[data-previous]") && incCurrentStepByN(-1)
  showCurrentStep()
})
