function numToExp(num)   //把数字转成科学计数法(返回object)
{
    if(typeof num == 'number')
    {
        if(num)
        {
            var newExp = Math.floor( Math.log10( num ) );
            var ret = new bigNum( num / Math.pow(10, newExp) , newExp);
            return ret;
        }
        var ret = new bigNum(0,0);
        return ret;
    }
    if(typeof num == 'object')
    {
        return num;
    }
    var ret = new bigNum(0,0);
    return ret;
}
function expToStr(value)    //把科学计数法的数字转为string
{
    if(value.exp >= 1e5)
    {
        return 'e' + ( value.exp > 0 ? '+' : '' ) + expToStr( numToExp(value.exp) );
    }
    if(Math.abs(value.exp) < 5)
    {
        return (value.bas * Math.pow(10, value.exp)).toFixed(4 - value.exp);
    }
    return '' + ( (value.bas).toFixed(4) ) + 'e' + ( value.exp > 0 ? '+' : '' ) + value.exp;
}
function expToExp(num)    //把科学计数法的数字转为正规的科学计数法
{
    var value = num;
    if(value.bas)
    {
        value.bas *= Math.pow( 10 , value.exp - Math.floor(value.exp) );
        value.exp = Math.floor(value.exp);
        while( Math.abs(value.bas) < 1)
        {
            value.bas *= 10;
            value.exp--;
        }
        while( Math.abs(value.bas) >= 10)
        {
            value.bas *= 0.1;
            value.exp++;
        }
    }
    else
    {
        value.exp = 0;
    }
    return value;
}
function add(val1, val2)    //加法
{
    if( Math.abs( val1.exp-val2.exp ) >= 308 )  //如果两数差距过大就别算了
    {
        return ( greater( abs(val1) , abs(val2) ) ? new bigNum( val1.bas , val1.exp ) : new bigNum( val2.bas , val2.exp ) );
    }
    var ret = new bigNum( val1.bas + val2.bas * Math.pow( 10, val2.exp - val1.exp ) , val1.exp );
    ret = expToExp(ret);
    return ret;
}
function sub(val1, val2)    //减法
{
    if( Math.abs( val1.exp-val2.exp ) >= 308 )  //如果两数差距过大就别算了
    {
        return ( greater( abs(val1) , abs(val2) ) ? new bigNum( val1.bas , val1.exp ) : new bigNum( -1 * val2.bas , val2.exp ) );
    }
    var ret = new bigNum( val1.bas - val2.bas * Math.pow( 10, val2.exp - val1.exp ) , val1.exp );
    ret = expToExp(ret);
    return ret;
}
function mul(val1, val2)    //乘法
{
    var ret = new bigNum( val1.bas * val2.bas , val1.exp + val2.exp );
    ret = expToExp(ret);
    return ret;
}
function div(val1, val2)    //除法
{
    var ret = new bigNum( val1.bas / val2.bas , val1.exp - val2.exp );
    ret = expToExp(ret);
    return ret;
}