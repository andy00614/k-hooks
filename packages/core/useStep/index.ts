import { ref } from 'vue-demi'

export default function useStep(stepEnum: any[]) {
    const index = ref(0)
    const currentStep = ref(stepEnum[0]);
    const changeCurrentStep = () => {
        currentStep.value = stepEnum[index.value]
    }
    const next = () => {
        index.value += 1;
        changeCurrentStep()
    }
    const back = () => {
        index.value -= 1;
        changeCurrentStep()
    }
    const reset = () => {
        index.value = 0;
        changeCurrentStep()
    }

    return {
        next,
        back,
        reset,
        index,
        currentStep
    }
}
