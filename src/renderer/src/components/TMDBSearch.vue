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
          <!--TODO:3.用element plus滚动条组件 -->
          <div class="body-header-box">
            <el-input
              v-model="name"
              placeholder="请输入电视剧名称"
              clearable
              @keydown.enter="search"
            >
            </el-input>
            <CommonButton class="search-btn" @click="search">搜索</CommonButton>
          </div>
          <!-- 骨架屏效果 -->
          <div v-show="isLoading" class="skeleton-container">
            <el-skeleton v-for="i in 16" :key="i" animated>
              <template #template>
                <el-skeleton-item variant="image" style="width: 100px; height: 140px"/>
                <el-skeleton-item variant="text" style="width: 80px; margin-top: 8px"/>
                <el-skeleton-item variant="text" style="width: 50px; margin-top: 4px"/>
              </template>
            </el-skeleton>
          </div>
          <div class="body-container-box" v-show="TMDBResult.length && !isLoading ">
            <div v-for="TVSeries in TMDBResult" class="body-container-item" @click="selectTVSeriesId = TVSeries.id">
              <!--TMDB请求图片尺寸：w92、w154、w185、w342、w500、w780、original（原始尺寸）-->
              <el-image :src="`https://image.tmdb.org/t/p/w92${TVSeries.poster_path}`" alt="poster" lazy
                        :class="{'tv-image':true,'is-active':selectTVSeriesId === TVSeries.id}"/>
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
          <!-- TODO:未改主题色         -->
          <el-pagination
            v-model:current-page="currentPage"
            :total="total"
            :page-size="20"
            hide-on-single-page
            layout="prev, pager, next"
            @current-change="search()"
            class="pagination"
          />
          <div class="body-no-data" v-show="!TMDBResult.length && !isLoading ">暂无数据</div>
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
  poster_path: string;
  // 名称
  name: string;
  // 年份
  first_air_date: string;
  // 描述
  overview: string;
  id: number;
}

const publicStore = usePublicStore();
const diskStore = useDiskStore();

// 开关
const dialogVisible = ref(false);
const isLoading = ref(false);

// TMDB搜索结果
const TMDBResult = ref<ITMDBResultItem[]>([]);

// input输入的名称
const name = ref("");
// 当前选择的电视剧
const selectTVSeriesId = ref();
// 当前页码
const currentPage = ref(1);
// 数据总条数
const total = ref(0);


const cancel = () => {
  dialogVisible.value = false;
};

// 确定
const confirm = () => {
  if (!selectTVSeriesId.value) {
    ElMessage("请选择一个电视剧");
    return;
  }
  diskStore.TVSeriesModeForm.name = TMDBResult.value.filter((item) => item.id === selectTVSeriesId.value)[0].name;
  dialogVisible.value = false;
};

const showDialog = () => {
  dialogVisible.value = true;
};

// 搜索
const search = async () => {
  if (!name.value.trim()) {
    ElMessage("请输入搜索内容");
    return;
  }

  // url地址
  const url = `https://api.themoviedb.org/3/search/tv?query=${name.value}&language=zh-CN&page=${currentPage.value}`;
  // api 配置项
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWNkMDQ1NGM5ODMxOTA1ZDFiMDk1ZDNlZDg3NWQ0NCIsIm5iZiI6MTczOTQ0MDM0NS42NDQsInN1YiI6IjY3YWRjMGQ5NTMzNTNmOWJiYTM2ZWVmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AqO9jtKsKdb0w3sSmkBlkyztT1U4l1VmmntRXfpbGfI"
    }
  };
  isLoading.value = true; // 显示骨架屏
  try {
    const response = await fetch(url, options);
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    TMDBResult.value = data.results;
    total.value = data.total_results;
    console.log(data);
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    isLoading.value = false; // 隐藏骨架屏，显示真实数据
  }

};
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
    padding: 0 1.5rem;

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

        .tv-image {
          padding: 1px;
          border-radius: 0.25rem;
          width: 100%;
          height: 140px;
          cursor: pointer;
        }

        .tv-image.is-active {
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

    .skeleton-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 1rem;
      padding: 1rem 1.5rem;
      height: 50vh;
      overflow-y: auto;
    }


    .pagination {
      display: flex;
      align-items: center;
      justify-content: end;
      margin-top: 1rem;
    }

    .body-no-data {
      height: 50vh;
      display: grid;
      grid-template-columns:  1fr;
      align-items: center;
      text-align: center;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
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
