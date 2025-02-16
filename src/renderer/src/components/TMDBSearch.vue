<template>
  <div class="TMDB-search-container">
    <div class="name" @click="showDialog">TMDB搜索</div>
    <el-dialog
      v-model="dialogVisible"
      :show-close="false"
      :align-center="true"
      :draggable="true"
    >
      <template #header>
        <div class="dialog-header">
          <div>TMDB搜索</div>
          <el-icon class="close-icon" @click="cancel">
            <Close/>
          </el-icon>
        </div>
      </template>
      <template #default>
        <div class="dialog-body">
          <div class="body-header-box">
            <el-input
              v-model="name"
              placeholder="请输入电视剧名称"
              clearable
              @keydown="search"
            >
            </el-input>
            <CommonButton class="search-btn" @click="search">搜索</CommonButton>
          </div>
          <div class="body-container-box">
            <div v-for="TVSeries in TMDBResult" class="body-container-item" @click="selectTVSeriesId = TVSeries.id">
              <img :src="`https://image.tmdb.org/t/p/original${TVSeries.poster_path}`" alt="poster"
                   :class="{'is-active':selectTVSeriesId === TVSeries.id}">
              <el-tooltip
                :effect="publicStore.themeMode"
                :content="TVSeries.name"
                placement="top"
                :show-after="200"
              >
                <div class="item-name">{{ TVSeries.name }}</div>
              </el-tooltip>
              <div>{{ TVSeries.first_air_date }}</div>
            </div>
          </div>

        </div>
      </template>

      <template #footer>
        <div class="dialog-footer">
          <CommonButton @click="cancel">取消</CommonButton>
          <CommonButton @click="confirm">确定</CommonButton>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import CommonButton from "@renderer/components/CommonButton.vue";
import {Close} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

interface ITMDBResultItem {
  // 封面图地址
  poster_path: string
  // 名称
  name: string
  // 年份
  first_air_date: string
  // 描述
  overview: string
  id: number
}

const publicStore = usePublicStore();
const diskStore = useDiskStore();

// 开关
const dialogVisible = ref(false);

// TMDB搜索结果
const TMDBResult = ref<ITMDBResultItem[]>([]);

// input输入的名称
const name = ref('');
// 当前选择的电视剧
const selectTVSeriesId = ref()


const cancel = () => {
  dialogVisible.value = false;
};

// 确定
const confirm = () => {
  if (!selectTVSeriesId.value) {
    ElMessage('请选择电视剧')
    return
  }
  diskStore.TVSeriesModeForm.name = TMDBResult.value.filter((item) => item.id === selectTVSeriesId.value)[0].name
  dialogVisible.value = false;
};

const showDialog = () => {
  dialogVisible.value = true;
}

// 搜索
const search = async () => {
  // url地址
  const url = `https://api.themoviedb.org/3/search/tv?query=${name.value}&language=zh-CN&page=1`
  // api 配置项
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWNkMDQ1NGM5ODMxOTA1ZDFiMDk1ZDNlZDg3NWQ0NCIsIm5iZiI6MTczOTQ0MDM0NS42NDQsInN1YiI6IjY3YWRjMGQ5NTMzNTNmOWJiYTM2ZWVmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AqO9jtKsKdb0w3sSmkBlkyztT1U4l1VmmntRXfpbGfI'
    }
  };
  console.log(url)
  try {
    const response = await fetch(url, options);
    console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    TMDBResult.value = data.results;
    console.log(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }

}
</script>

<style scoped lang="less">
.TMDB-search-container {
  .name {
    color: var(--theme-common-color);
    cursor: pointer;
    text-decoration: underline;
  }

  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    font-size: 16px;
    color: var(--text-color);

    .close-icon {
      cursor: pointer;

      &:hover {
        color: var(--theme-common-color);
        filter: brightness(1.2);
      }
    }
  }

  .dialog-body {
    padding: 0 1.5rem 1rem;

    .body-header-box {
      margin-bottom: 1rem;
      display: flex;

      .search-btn {
        margin-left: 1rem;
      }
    }

    .body-container-box {
      height: 50vh;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
      gap: 1rem;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      overflow-y: auto;

      .body-container-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--text-color);

        img {
          padding: 1px;
          border-radius: 0.25rem;
          width: 100%;
          height: 140px;
          cursor: pointer;
        }

        img.is-active {
          border: 2px solid var(--theme-common-color);
        }

        .item-name {
          text-align: center;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }
      }
    }
  }

  .dialog-footer {
    padding: 0.75rem 1.5rem;
    border-top: 1px solid var(--border-color);
  }
}

:deep(.el-dialog) {
  padding: 0;
  background-color: var(--background-color);
}

@media (max-width: 1350px) {
  :deep(.el-dialog) {
    width: 70vw;
  }
}

@media (min-width: 1351px) {
  :deep(.el-dialog) {
    width: 50vw;
  }
}
</style>
