<template>
  <pin-filter-group
    v-model="query"
    :option="filterGroupOption"
  />
  <h5>query的值</h5>
  <p>{{ query }}</p>
</template>

<script lang="ts">
import { MdMusicalNote as MusicIcon } from '@vicons/ionicons4'
import { NIcon } from 'naive-ui'
import { ref, defineComponent, computed, onMounted, h } from 'vue'
import type { FilterGroupOption } from 'pinos-ui'

export default defineComponent({
  name: 'Fg',
  setup() {
    const options = ref<any[]>([])
    const filterGroupOption = computed<FilterGroupOption[]>(() => {
      return [
        {
          element: 'n-select',
          modelKey: 'value',
          bindingArg: 'value',
          props: {
            placeholder: '请选择',
            clearable: true,
            options: options.value,
            renderLabel: (option: any) => {
              if (option.type === 'group') return `${option.label}(Cool!)`
              return [
                h(
                  NIcon,
                  {
                    style: {
                      verticalAlign: '-0.15em',
                      marginRight: '4px'
                    }
                  },
                  {
                    default: () => h(MusicIcon)
                  }
                ),
                option.label as string
              ]
            },
            style: {
              width: '200px'
            }
          }

        }
      ]
    })

    const query = ref<Record<string, any>>({
      value: ''
    })

    const mockSyncRequest = (data: any[], time = 1000): Promise<any[]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(data)
        }, time)
      })
    }

    const getRequest = async () => {
      const status = [
        {
          type: 'group',
          label: 'Rubber Soul',
          key: 'Rubber Soul Album',
          children: [
            {
              label: "Everybody's Got Something to Hide Except Me and My Monkey",
              value: 'song0',
              disabled: true
            },
            {
              label: 'Drive My Car',
              value: 'song1',
              style: {
                color: 'red'
              }
            },
            {
              label: 'Norwegian Wood',
              value: 'song2'
            },
            {
              label: "You Won't See",
              value: 'song3',
              disabled: true
            },
            {
              label: 'Nowhere Man',
              value: 'song4'
            },
            {
              label: 'Think For Yourself',
              value: 'song5'
            },
            {
              label: 'The Word',
              value: 'song6'
            },
            {
              label: 'Michelle',
              value: 'song7',
              disabled: true
            },
            {
              label: 'What goes on',
              value: 'song8'
            },
            {
              label: 'Girl',
              value: 'song9'
            },
            {
              label: "I'm looking through you",
              value: 'song10'
            },
            {
              label: 'In My Life',
              value: 'song11'
            },
            {
              label: 'Wait',
              value: 'song12'
            }
          ]
        },
        {
          type: 'group',
          label: 'Let It Be',
          key: 'Let It Be Album',
          children: [
            {
              label: 'Two Of Us',
              value: 'Two Of Us'
            },
            {
              label: 'Dig A Pony',
              value: 'Dig A Pony'
            },
            {
              label: 'Across The Universe',
              value: 'Across The Universe'
            },
            {
              label: 'I Me Mine',
              value: 'I Me Mine'
            },
            {
              label: 'Dig It',
              value: 'Dig It'
            },
            {
              label: 'Let It Be',
              value: 'Let It Be'
            },
            {
              label: 'Maggie Mae',
              value: 'Maggie Mae'
            },
            {
              label: "I've Got A Feeling",
              value: "I've Got A Feeling"
            },
            {
              label: 'One After 909',
              value: 'One After 909'
            },
            {
              label: 'The Long And Winding Road',
              value: 'The Long And Winding Road'
            },
            {
              label: 'For You Blue',
              value: 'For You Blue'
            },
            {
              label: 'Get Back',
              value: 'Get Back'
            }
          ]
        }
      ]
      options.value = await mockSyncRequest(status, 200)
    }

    onMounted(() => {
      getRequest()
    })

    return {
      filterGroupOption,
      query
    }
  }
})
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: space-between;
}
.flex .red {
  color: red;
}
</style>
