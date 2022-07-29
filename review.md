React is a library - vue is a framework It builds on top of standard HTML, CSS and JavaScript so its easier than react o mn
na7yet el style 

# Vue can be used in different ways:

Enhancing static HTML without a build step
Embedding as Web Components on any page
Single-Page Application (SPA)
Fullstack / Server-Side Rendering (SSR)
Jamstack / Static Site Generation (SSG)
Targeting desktop, mobile, WebGL, and even the terminal

# Single-File Components (SFC feature of Vue)
A Vue SFC, as the name suggests, encapsulates 
1-the component's logic (JavaScript),
2- template (HTML), 
3-and styles (CSS) in a single file.

<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>

# API Styles

Vue components can be authored in two different API styles: Options API and Composition API.

## Options API

With Options API, we define a component's logic using an object of options such as data, methods, and mounted. Properties defined by options are exposed on this inside functions, which points to the component instance:

<script>
export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      count: 0
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event listeners in templates.
  methods: {
    increment() {
      this.count++
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>



## Composition API
Go with Composition API + Single-File Components if you plan to build full applications with Vue.


<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`) // ma bnst5dem this
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>



## Creating a Vue Application


-The application instance#
Every Vue application starts by creating a new application instance with the createApp function:

*-The Root Component*
import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'

const app = createApp(App)

*-Mounting the App*
An application instance won't render anything until its .mount() method is called. It expects a "container" argument, which can either be an actual DOM element or a selector string:

<div id="app"></div>
app.mount('#app')

# Boolean Attributes#
Boolean attributes are attributes that can indicate true / false values by its presence on an element. For example, disabled is one of the most commonly used boolean attributes.

v-bind works a bit differently in this case:

<button :disabled="isButtonDisabled">Button</button>

# Dynamically Binding Multiple Attributes#
If you have a JavaScript object representing multiple attributes that looks like this:

data() {
  return {
    objectOfAttrs: {
      id: 'container',
      class: 'wrapper'
    }
  }
}
You can bind them to a single element by using v-bind without an argument:

<div v-bind="objectOfAttrs"></div>


# Modifiers#
Modifiers are special postfixes denoted by a dot, which indicate that a directive should be bound in some special way. For example, the .prevent modifier tells the v-on directive to call event.preventDefault() on the triggered event:

<form @submit.prevent="onSubmit">...</form>


# Declaring Methods


To add methods to a component instance we use the methods option. This should be an object containing the desired methods:

export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // methods can be called in lifecycle hooks, or other methods!
    this.increment()
  }
}
Vue automatically binds the this value for methods so that it always refers to the component instance. This ensures that a method retains the correct this value if it's used as an event listener or callback. You should avoid using arrow functions when defining methods, as that prevents Vue from binding the appropriate this value:

export default {
  methods: {
    increment: () => {
      // BAD: no `this` access here!
    }
  }
}

To wait for the DOM update to complete after a state change, you can use the nextTick() global API:

import { nextTick } from 'vue'

export default {
  methods: {
    increment() {
      this.count++
      nextTick(() => {
        // access updated DOM
      })
    }
  }

  # Deep Reactivity

  This means you can expect changes to be detected even when you mutate nested objects or arrays:

  export default {
  data() {
    return {
      obj: {
        nested: { count: 0 },
        arr: ['foo', 'bar']
      }
    }
  },
  methods: {
    mutateDeeply() {
      // these will work as expected.
      this.obj.nested.count++
      this.obj.arr.push('baz')
    }
  }
}

# Stateful Methods
In some cases, we may need to dynamically create a method function, for example creating a debounced event handler:

import { debounce } from 'lodash-es'

export default {
  methods: {
    // Debouncing with Lodash
    click: debounce(function () {
      // ... respond to click ...
    }, 500)
  }
}
However, this approach is problematic for components that are reused because a debounced function is stateful: it maintains some internal state on the elapsed time.


# Computed Properties

export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  }
}

<p>Has published books:</p>
<span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span> 

bdal ma 2dal 2nadi had b 2y mkan 3shan ashof el length bst5dem computed property

export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // a computed getter
    publishedBooksMessage() {
      // `this` points to the component instance
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
}
<p>Has published books:</p>
<span>{{ publishedBooksMessage }}</span>

You can data-bind to computed properties in templates just like a normal property. Vue is aware that this.publishedBooksMessage depends on this.author.books, so it will update any bindings that depend on this.publishedBooksMessage when this.author.books changes.(y3ne zy k2nha redux store 7sab sho el state bt3ml update)

Computed Caching vs Methods 
This means as long as author.books has not changed, multiple access to publishedBooksMessage will immediately return the previously computed result without having to run the getter function again.
In comparison, a method invocation will always run the function whenever a re-render happens.

## bindig to objects

data() {
  return {
    isActive: true,
    hasError: false
  }
}
And the following template:

<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
It will render:

<div class="static active"></div>

## Binding inline styles

data() {
  return {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
}
<div :style="styleObject"></div>

## Conditional rendering

v-else#
You can use the v-else directive to indicate an "else block" for v-if:

<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>

## List Rendering

v-for#
We can use the v-for directive to render a list of items based on an array. The v-for directive requires a special syntax in the form of item in items, where items is the source data array and item is an alias for the array element being iterated on:

data() {
  return {
    items: [{ message: 'Foo' }, { message: 'Bar' }]
  }
}
<li v-for="item in items">
  {{ item.message }}
</li>

data() {
  return {
    myObject: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
}
<ul>
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>



////

<input
  :value="text"
  @input="event => text = event.target.value">
The v-model directive helps us simplify the above to:

<input v-model="text">

https://vuejs.org/guide/essentials/forms.html#select

