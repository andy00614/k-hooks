import { ref } from 'vue-demi'

export default function useStep(stepEnum: any[]) {
    const index = ref(0)
    const currentStep = ref(stepEnum[0]);
    const changeCurrentStep = () => {
        currentStep.value = stepEnum[index.value]
    }
    const next = () => {
        if(index.value + 1 >= stepEnum.length) {
            return;
        }
        index.value += 1;
        changeCurrentStep()
    }
    const back = () => {
        if(index.value - 1 <= 0) {
            return;
        }
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
