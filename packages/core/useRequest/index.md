# 自动请求

## 基本用法
useRequest 只需要提供一个异步请求接口即可使用该功能，
会返回loading，data值，通过loading的true or false 
表示data是否请求成功

## demo
<script setup>
import useRequest from './index.ts';
import {mockRequest} from './utils';
const { loading, data } = useRequest(mockRequest);
import {mockPaginationRequest} from './utils'
import {ref} from 'vue-demi';
const { loading: loading1, data: data1, run } = useRequest(mockRequest, {manaul: true});
const { loading: loading2, data: data2, run: run1 } = useRequest(mockRequest, { manaul: true });
let requestIdx = 0;
let time = 4000;
const competitionRequest = () => {
    requestIdx++;
    run1(`competitionRequest${requestIdx}`, time);
    time = time / 2;
};
let count = 0

const times = ref(0);
const mockRequestWithRequestTimes = async(v,t) => {
    mockRequest(v,t)
    times.value += 1;
}

const { data: data3, run: run2 } = useRequest(mockRequestWithRequestTimes, {
    debounceInterval: 500,
    manaul: true
});

const handleInput = (e) => {
    run2(e.target.value, 200);
};

 const inputValue = ref('');
const request = (current, pageSize) => {
    return mockPaginationRequest({
        currentPage: current,
        pageSize: pageSize,
        count: 200,
    });
}

const { data: data4, pagination, paginationEvent } = useRequest(request, {
    paginated: true,
    refreshDeps: [inputValue],
    debounceInterval: 200,
    initialData: {
        pageSize: 10,
        total:0,
        currentPage: 1
    }
});


</script>


<div>
    <h1>自动请求</h1>
    <div v-if="loading">loading...</div>
    <div v-else>
        请求结果： {{data}}
    </div>
</div>

```js
<template>
   <div>
       <h1>自动请求</h1>
       <div v-if="loading">loading...</div>
       <div v-else>
           请求结果： {{data}}
       </div>
    </div>
</template>

<script lang="ts">
import {mockRequest} from './utils';
type MockRequest = () => Promise<string>
const mockRequest:MockRequest = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve('ok');
    }, 1000);
});

export default {
    setup() {
        const { loading, data } = useRequest(mockRequest);
        return {
            loading,
            data,
        };
    },
};

</script>

<style lang="less" scoped>
</style>

```


# 点击触发请求结果

## 基本用法
通常点击请求需要写一个click事件，渲染请求的data 通过判断data是否有值来判断是否加载完成
现在封装成一起，只需要使用userequest 将loading data run 分别赋值即可

### demo



<div>
    <h1>手动请求</h1>
    <button @click="run">点击触发请求</button>
    <div v-if="loading1">loading...</div>
    <div v-else>
        请求结果： {{data1}}
    </div>
</div>


```js
<template>
   <div>
       <h1>手动请求</h1>
       <button @click="run">点击触发请求</button>
       <div v-if="loading">loading...</div>
       <div v-else>
           请求结果： {{data}}
       </div>
    </div>
</template>

<script lang="ts">
import useRequest from '../src/index';

type MockRequest = () => Promise<string>

const mockRequest:MockRequest = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve('ok');
    }, 1000);
});

export default {
    setup() {
        const { loading, data, run } = useRequest(mockRequest,{manaul: true});
        return {
            loading,
            data,
            run
        };
    },
};

</script>

<style lang="less" scoped>
</style>
```

# 静态处理

## 如果不加静态处理，连续点击两次(触发两次请求)，如果第一次的请求时间晚于第二次,
会先显示第二次的结果 随后又被第一次的结果覆盖
所以会造成的问题是 1.数据不准确 2. 闪烁

### demo
<div>
        <h1>静态处理</h1>
        <div class="tip">
            tip: <br>
            如果不加静态处理的话，连续点击两次(触发两次请求)，如果第一次的请求时间晚于第二次，会先显示第二次的结果，随后又被第一次的结果覆盖。<br>
            所以造成的问题是：1.数据不准确 2.闪烁
        </div>
        <button @click="competitionRequest">点击触发请求(连续点击两次)</button>
        <div v-if="loading2">loading...</div>
        <div v-else>请求结果： {{ data2 }}</div>
</div>

```js
    <template>
    <div>
        <h1>静态处理</h1>
        <div class="tip">
            tip: <br>
            如果不加静态处理的话，连续点击两次(触发两次请求)，如果第一次的请求时间晚于第二次，会先显示第二次的结果，随后又被第一次的结果覆盖。<br>
            所以造成的问题是：1.数据不准确 2.闪烁
        </div>
        <button @click="competitionRequest">点击触发请求(连续点击两次)</button>
        <div v-if="loading">loading...</div>
        <div v-else>请求结果： {{ data }}</div>
    </div>
</template>

<script lang="ts">
import useRequest from '../src/index';

function mockRequest<T>(body: T, time = 200): Promise<T> {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('mockRequest exec');
            resolve(body);
        }, time);
    });
}

export default {
    setup() {
        const { loading, data, run } = useRequest(mockRequest, { manaul: true });

        let requestIdx = 0;
        let time = 4000;
        const competitionRequest = () => {
            requestIdx++;
            run(`competitionRequest${requestIdx}`, time);
            time = time / 2;
        };

        return {
            competitionRequest,
            loading,
            data,
        };
    },
};
</script>

<style lang="less" scoped>
.tip {
    font-size: 12px;
    margin: 10px 0;
    line-height: 16px;
    color: red;
}
</style>
````

# 取消请求

## 基本用法 
点击发送请求之后，如果想要请求中断或者取消 可以再次加入一个cancel参数来进行取消

### demo

<div>
       <h1>取消请求</h1>
       <button @click="run2">点击触发请求</button>
       <button @click="cancel">点击取消请求</button>
       <div v-if="loading3">loading... </div>
       <div v-else>
           请求结果： {{data3}}
       </div>
</div>

```js
<template>
   <div>
       <h1>取消请求</h1>
       <button @click="run">点击触发请求</button>
       <button @click="cancel">点击取消请求</button>
       <div v-if="loading">loading...</div>
       <div v-else>
           请求结果： {{data}}
       </div>
    </div>
</template>

<script lang="ts">
import useRequest from '../src/index';

function mockRequest<T>(body: T, time = 200): Promise<T> {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('mockRequest exec');
            resolve(body);
        }, time);
    });
}

export default {
    setup() {
        let count = 0
        const { loading, data, run, cancel } = useRequest(() => mockRequest(`第${++count}次请求`,2000),{manaul: true});
        return {
            loading,
            data,
            run,
            cancel
        };
    },
};

</script>

<style lang="less" scoped>
.tip {
    font-size: 12px;
    margin: 10px 0;
    line-height: 16px;
    color: red;
}
</style>
```


# 请求消抖

## 比如在输入框连续输入并请求，如果一次一请求，会造成资源浪费，加入请求消抖

## demo

<div>
    <h1>消抖测试</h1>
    <input @input="handleInput" />
    <div>请求执行了{{times}}次</div>
</div>

```js
    <template>
    <div>
        <h1>消抖测试</h1>
        <input @input="handleInput" />
        <div>请求执行了{{times}}次</div>
    </div>
</template>

<script lang="ts">
import { ref } from '@vue/composition-api';
import useRequest from '../src/index';

function mockRequest<T>(body: T, time = 200): Promise<T> {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('mockRequest exec');
            resolve(body);
        }, time);
    });
}

export default {
    setup() {
        const times = ref(0);
        const mockRequestWithRequestTimes = async(v:string,t:number) => {
            mockRequest(v,t)
            times.value += 1;
        }

        const { data, run } = useRequest(mockRequestWithRequestTimes, {
            debounceInterval: 500,
            manaul: true
        });

        const handleInput = (e: { target: { value: string } }) => {
            run(e.target.value, 200);
        };

        return {
            handleInput,
            data,
            times
        };
    },
};
</script>

<style lang="less" scoped></style>


```

## 分页hooks

可自动处理如下功能
1. 根据依赖自动刷新内容和分页信息
2. 重新搜索、切换分页大小、会自动重置current
3. 切换页码的时候，会自动请求对应页的内容并展示
   
需需要传入的请求方法必须带上页码和size两个参数

<div class="hello">
        <h1>pagination-hooks</h1>
        <ul class='tip'>
            可自动处理如下功能:
            <li>1.根据依赖自动刷新内容和分页信息</li>
            <li>2.重新搜索、切换分页大小，会自动重置current</li>
            <li>3.切换页码的时候，会自动请求对应页的内容并展示(*需要传入的请求方法必须带上页码和size两个参数)</li>
        </ul>
        <input type="text" v-model="inputValue" placeholder="请输入搜索内容" />
        <div>pagination: {{pagination}}</div>
        result: 第{{data4 && data4.currentPage}}页内容
        <el-pagination
            :page-sizes="[10, 20, 50]"
            layout="sizes, prev, pager, next"
            v-bind="pagination"
            v-on="paginationEvent"
        >
        </el-pagination>
</div>




