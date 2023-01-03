// 数组长度做计算

// demo1 创建定长数组
type CreateArray<T extends number, Arr extends unknown[] = []> = Arr["length"] extends T ? Arr : CreateArray<T, [...Arr, unknown]>
type Demo41Result = CreateArray<5>

// Demo2 加法
type AddDemo1<T extends number, P extends number> = [...CreateArray<T>, ...CreateArray<P>]["length"]
type Demo42Four = AddDemo1<6, 5>

// Demo3 减法 ******************************
type SubDemo1<T extends number, P extends number> = CreateArray<T> extends [...CreateArray<P>, ...infer Last] ? Last["length"] : 0
type Demo43Result = SubDemo1<5,1>

// Demo4 乘法 ***************************
type ChengFa<T extends number, P extends number, Count extends unknown[] = [], Result extends unknown[] = []> = Count["length"] extends T ?
Result['length'] : ChengFa<T, P, [...Count, unknown], [...Result, ...CreateArray<P>]>
type Demo44Result = ChengFa<7, 9>

// Demo5 除法
type Chufa<T extends number, P extends number, Result extends unknown[] = []> = 
  SubDemo1<T, P> extends 0 ?  [...Result, unknown]["length"] : Chufa<SubDemo1<T, P>, P, [...Result, unknown]>
type Demo45Result = Chufa<6, 6>

// Demo7 比较大小
type Biggest<T extends number, P extends number> = 
  CreateArray<T> extends [...CreateArray<P>, ...infer Last] ? false : true
type Demo47Result = Biggest<3,5>
