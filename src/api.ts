
export interface FoodData{
    code:string,
    name:string,
}
export interface Ingredient{
    '제목':string,
    '재료':string[]
}
export interface Recipe{
    '제목':string,
    '설명':string[]
}
export interface Food{
    '코드':string,
    '메뉴명':string,
    '이미지':string,
    '재료':Ingredient[],
    '조리법':Recipe[]
}
export async function fetch_food_codes(){
    const url = 'https://raw.githubusercontent.com/jwpark363/kfood-recommend/refs/heads/main/db/json/food_code_data.csv';
    const data = await fetch(url).then(response => response.text());
    return data;
}

// 한식진흥원 특정 JSON 데이터 가져오기
export async function fetch_food_data(food:FoodData){
    const url = `https://raw.githubusercontent.com/jwpark363/kfood-recommend/refs/heads/main/db/json/${food.code}_${food.name}.json`;
    // console.log(url);
    const data = await fetch(url).then(response => response.json());
    return data;
}