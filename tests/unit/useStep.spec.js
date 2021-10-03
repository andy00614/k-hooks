import { useStep } from "../../packages/core/index";
import { mountComposition } from "vue-composition-test-utils";

test("should get current composition result", function() {
  const wrapper = mountComposition(() => useStep(["step1", "step2",'step3']));
  wrapper.result.current.next();
  wrapper.result.current.next();
  expect(wrapper.result.current.currentStep.value).toBe("step3");
  // expect(wrapper.result.current.count.value).toEqual(0)
});


test('初始值对不对',() => {
  const wrapper = mountComposition(() => useStep(["step1", "step2",'step3']));
  expect(wrapper.result.current.currentStep.value).toBe('step1') 
})

test('上一步对不对',() => {
  const wrapper = mountComposition(() => useStep(["step1", "step2",'step3']));
  wrapper.result.current.back();
  expect(wrapper.result.current.currentStep.value).toBe('step1') 
  wrapper.result.current.next();
  wrapper.result.current.next();
  wrapper.result.current.back();
  expect(wrapper.result.current.currentStep.value).toBe('step2') 
})

test('reset对不对',() => {
  const wrapper = mountComposition(() => useStep(["step1", "step2",'step3']));
  wrapper.result.current.next()
  wrapper.result.current.next()
  wrapper.result.current.next()
  wrapper.result.current.reset()
  expect(wrapper.result.current.currentStep.value).toBe('step1') 
})