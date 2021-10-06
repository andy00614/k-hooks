import { useRequest } from "../../packages/core/index";
import { mountComposition } from "vue-composition-test-utils";
const mockRequest = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve('ok')
    }, 1000)
})
test("should get current composition result", async function() {
  const wrapper = mountComposition(() => useRequest(mockRequest));
  console.log(wrapper)
//   wrapper.result.current.next();
//   wrapper.result.current.next();
//   expect(wrapper.result.current.currentStep.value).toBe("step3");
  // expect(wrapper.result.current.count.value).toEqual(0)
});