export interface FoodData{
    code:string,
    name:string,
}
export interface Ingredient{
    title:string,
    ingredients:string[]
}
export interface Recipe{
    title:string,
    desc:string[]
}
export interface Food{
    code:string,
    menu:string,
    image:string,
    ingredient:Ingredient[],
    recipe:Recipe[],
}
export interface Predict{
    class_id: number,
    class_name: string,
    class_code: string,
    probability: number
}
export interface CodeData{
    code: string,
    name:string,
    kfood_code:string,
    kfood_name:string,
    image_type:string,
    image_name:string,
    similarity:string[]
}
export async function fetch_food_codes(){
    // https://raw.githubusercontent.com/jwpark363/kfood-recommend/refs/heads/main/json/56756_%ED%9D%B0%EB%B0%A5.json
    const url = 'https://raw.githubusercontent.com/jwpark363/kfood-recommend/refs/heads/main/db/json/kfpi_data.csv';
    const csvdata = await fetch(url).then(response => response.text());
    const food_data : FoodData[] = [];
    if(csvdata !== null){
        //csv 데이터를 FoodData 배열로 변환
        csvdata.split("\n").map(data => {
            const food = data.split(",")
            if(food.length >= 2){
                const new_food = {
                    code : food[0],
                    name : food[1]
                }
                food_data.push(new_food)
            }
        })
    }
    return food_data;
}

// 한식진흥원 특정 JSON 데이터 가져오기
export async function fetch_food_data(food:FoodData){
    const url = `https://raw.githubusercontent.com/jwpark363/kfood-recommend/refs/heads/main/db/json/${food.code}_${food.name}.json`;
    // console.log(url);
    const data = await fetch(url).then(response => response.json());
    data['코드'] = food.code;
    // console.log(data);
    return data;
}
//특정 food 코드에서 FoodData 가져오기
export async function fetch_food_data_by_code(code:string){
    // console.log(code);
    const food_data:FoodData[] = await fetch_food_codes();
    const food = food_data.filter(data => data.code === code);
    if(food.length == 0) return null
    const food_json = await fetch_food_data(food[0]);
    return food_json
}
//코드맵 정보 가져오기
export async function fetch_code_map(){
    const url = 'https://raw.githubusercontent.com/jwpark363/kfood-recommend/refs/heads/main/db/json/food_code_map.json';
    const json_text = await fetch(url).then(response => response.text())
    return json_text;
}