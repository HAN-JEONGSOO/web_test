(()=>{

    let yOffset             = 0;
    let currentSection      = 0;     
    let prevSectionHeight   = 0;
    let sectionYOffset      = 0;

    // Drawer
    const toggler   = document.querySelector('.drawer-toggler');
    const drawer    = document.querySelector('.drawer');


    const sectionSet = [
        // section-0
        {
            type : 'sticky',
            height : 0,
            multiple : 4,

            objs : {
                container : document.querySelector('#section-0'),
                introMsgA : document.querySelector('#section-0 .intro-message.a'),
                introMsgB : document.querySelector('#section-0 .intro-message.b'),
                introMsgC : document.querySelector('#section-0 .intro-message.c'),
                introMsgD : document.querySelector('#section-0 .intro-message.d'),
                introMsgE : document.querySelector('#section-0 .intro-message.e')

            },

            values : {
                messageA_opacity_out    : [0, 1, {start: 0.15, end: 0.19}],
                messageA_opacity_in     : [1, 0, {start: 0.23, end: 0.27}],

                messageB_opacity_out    : [0, 1, {start: 0.33, end: 0.37}],
                messageB_opacity_in     : [1, 0, {start: 0.41, end: 0.45}],

                messageC_opacity_out    : [0, 1, {start: 0.51, end: 0.55}],
                messageC_opacity_in     : [1, 0, {start: 0.59, end: 0.63}],

                messageD_opacity_out    : [0, 1, {start: 0.69, end: 0.73}],
                messageD_opacity_in     : [1, 0, {start: 0.77, end: 0.81}],

                messageE_opacity_out    : [0, 1, {start: 0.88, end: 0.92}],
                messageE_opacity_in     : [1, 0, {start: 0.96, end: 1.00}]
              
            }

        },
        
        // section-1
        {
            type : 'normal',
            height : 0,
            multiple : 2,
            objs : {
                container : document.querySelector('#section-1'),
                

            },
            values : {



            }

        },
   
    ];

//-------------------------------------------------------------------------
// 함수 파트
//-------------------------------------------------------------------------
    
    const initSectionSet = function()
    {
        // 높이를 설정.
        for(let i = 0; i < sectionSet.length; i++)
        {
            // 높이를 설정한다.
            sectionSet[i].height = window.innerHeight * sectionSet[i].multiple;                 
            sectionSet[i].objs.container.style.height = `${sectionSet[i].height}px`;

        }


    }    


    const getCurrentSection = function()
    {        
        let result = 0;

        if (yOffset <= sectionSet[0].height)
        {
            result = 0;

        }
        else if ((yOffset > sectionSet[0].height) && 
                 (yOffset <= sectionSet[0].height + sectionSet[1].height))
        {
            result = 1;
            
        }


        return result;
        
    }


    const getPrevSectionHeight = function()
    {
        let result = 0;

        for (let i = 0; i < currentSection; i++)
        {
            result = result + sectionSet[i].height;

        }

        return result;
    }


    const initHTMLPage = function()
    {

        initSectionSet();


    }

    // sectionYOffset의 위치를 판단해서.
    // 파라미터로 들어온 values의 범위 내에 적당한 값을 리턴한다.    
    const calcValue = function(values)
    {
        
        let result = 0;
        let rate = 0;
        
        let partStart = 0;      // start의 offset값
        let partEnd = 0;        // end의 offset값.
        let partHeight = 0;

        const range = values[1] - values[0];
        const sectionHeight = sectionSet[currentSection].height;



        if (values.length === 3)
        {
            partStart   = sectionHeight * values[2].start;
            partEnd     = sectionHeight * values[2].end;
            partHeight  = partEnd - partStart;


            if ((sectionYOffset >= partStart) && (sectionYOffset <= partEnd))
            {
                //1. 비율
                rate = (sectionYOffset - partStart) / partHeight;
                result = (rate * range) + values[0];               

            }
            else if (sectionYOffset < partStart)
            {
                result = values[0];

            }
            else if (sectionYOffset > partEnd)
            {
                result = values[1];

            }
            
        }
        else
        {
            rate = sectionYOffset / sectionHeight;
            result = (range * rate) + values[0];
      
        }

        return result;

    }


    const playAnimation = function()
    {
        let opacityValue = 0;
        let translateValue = 0;
        let imageIndex = 0;
        const cs = sectionSet[currentSection];
        

        const offsetRate = sectionYOffset / cs.height;

        switch(currentSection)
        {
            case 0 :               

                if (offsetRate < 0.15)
                {
                    cs.objs.introMsgA.style.opacity = `0`;
                    cs.objs.introMsgB.style.opacity = `0`;
                    cs.objs.introMsgC.style.opacity = `0`;
                    cs.objs.introMsgD.style.opacity = `0`;
                    cs.objs.introMsgE.style.opacity = `0`;

                }
                else if ((offsetRate >= 0.15) && (offsetRate <= 0.19))
                {
                    opacityValue = calcValue(sectionSet[currentSection].values.messageA_opacity_out);
                    sectionSet[currentSection].objs.introMsgA.style.opacity = `${opacityValue}`;

                }
                else  if ((offsetRate > 0.19) && (offsetRate <= 0.23))
                {
                    cs.objs.introMsgA.style.opacity = `1`;
                    cs.objs.introMsgB.style.opacity = `0`;
                    cs.objs.introMsgC.style.opacity = `0`;
                    cs.objs.introMsgD.style.opacity = `0`;
                    cs.objs.introMsgE.style.opacity = `0`;

                }
                else if ((offsetRate > 0.23) && (offsetRate <= 0.27))
                {
                    opacityValue = calcValue(sectionSet[currentSection].values.messageA_opacity_in);
                    sectionSet[currentSection].objs.introMsgA.style.opacity = `${opacityValue}`;
                }
                else  if ((offsetRate > 0.27) && (offsetRate <= 0.33))
                {
                    cs.objs.introMsgA.style.opacity = `0`;
                    cs.objs.introMsgB.style.opacity = `0`;
                    cs.objs.introMsgC.style.opacity = `0`;
                    cs.objs.introMsgD.style.opacity = `0`;
                    cs.objs.introMsgE.style.opacity = `0`;

                }
                else if ((offsetRate > 0.33) && (offsetRate <= 0.37))
                {
                    opacityValue = calcValue(sectionSet[currentSection].values.messageB_opacity_out);
                    sectionSet[currentSection].objs.introMsgB.style.opacity = `${opacityValue}`;

                }
                else  if ((offsetRate > 0.37) && (offsetRate <= 0.41))
                {
                    cs.objs.introMsgA.style.opacity = `0`;
                    cs.objs.introMsgB.style.opacity = `1`;
                    cs.objs.introMsgC.style.opacity = `0`;
                    cs.objs.introMsgD.style.opacity = `0`;
                    cs.objs.introMsgE.style.opacity = `0`;

                }
                else if ((offsetRate > 0.41) && (offsetRate <= 0.45))
                {
                    opacityValue = calcValue(sectionSet[currentSection].values.messageB_opacity_in);
                    sectionSet[currentSection].objs.introMsgB.style.opacity = `${opacityValue}`;
                }
                else  if ((offsetRate > 0.45) && (offsetRate <= 0.51))
                {
                    cs.objs.introMsgA.style.opacity = `0`;
                    cs.objs.introMsgB.style.opacity = `0`;
                    cs.objs.introMsgC.style.opacity = `0`;
                    cs.objs.introMsgD.style.opacity = `0`;
                    cs.objs.introMsgE.style.opacity = `0`;

                }
                else if ((offsetRate > 0.51) && (offsetRate <= 0.55))
                {
                    opacityValue = calcValue(sectionSet[currentSection].values.messageC_opacity_out);
                    sectionSet[currentSection].objs.introMsgC.style.opacity = `${opacityValue}`;

                }
                else  if ((offsetRate > 0.55) && (offsetRate <= 0.59))
                {
                    cs.objs.introMsgA.style.opacity = `0`;
                    cs.objs.introMsgB.style.opacity = `0`;
                    cs.objs.introMsgC.style.opacity = `1`;
                    cs.objs.introMsgD.style.opacity = `0`;
                    cs.objs.introMsgE.style.opacity = `0`;

                }
                else if ((offsetRate > 0.59) && (offsetRate <= 0.63))
                {
                    opacityValue = calcValue(sectionSet[currentSection].values.messageC_opacity_in);
                    sectionSet[currentSection].objs.introMsgC.style.opacity = `${opacityValue}`;
                }
                else  if ((offsetRate > 0.63) && (offsetRate <= 0.69))
                {
                    cs.objs.introMsgA.style.opacity = `0`;
                    cs.objs.introMsgB.style.opacity = `0`;
                    cs.objs.introMsgC.style.opacity = `0`;
                    cs.objs.introMsgD.style.opacity = `0`;
                    cs.objs.introMsgE.style.opacity = `0`;

                }
                else if ((offsetRate > 0.69) && (offsetRate <= 0.73))
                {
                    opacityValue = calcValue(sectionSet[currentSection].values.messageD_opacity_out);
                    sectionSet[currentSection].objs.introMsgD.style.opacity = `${opacityValue}`;

                }
                else  if ((offsetRate > 0.73) && (offsetRate <= 0.77))
                {
                    cs.objs.introMsgA.style.opacity = `0`;
                    cs.objs.introMsgB.style.opacity = `0`;
                    cs.objs.introMsgC.style.opacity = `0`;
                    cs.objs.introMsgD.style.opacity = `1`;
                    cs.objs.introMsgE.style.opacity = `0`;

                }
                else if ((offsetRate > 0.77) && (offsetRate <= 0.81))
                {
                    opacityValue = calcValue(sectionSet[currentSection].values.messageD_opacity_in);
                    sectionSet[currentSection].objs.introMsgD.style.opacity = `${opacityValue}`;
                }
                else  if ((offsetRate > 0.81) && (offsetRate <= 0.88))
                {
                    cs.objs.introMsgA.style.opacity = `0`;
                    cs.objs.introMsgB.style.opacity = `0`;
                    cs.objs.introMsgC.style.opacity = `0`;
                    cs.objs.introMsgD.style.opacity = `0`;
                    cs.objs.introMsgE.style.opacity = `0`;

                }
                else if ((offsetRate > 0.88) && (offsetRate <= 0.92))
                {
                    opacityValue = calcValue(sectionSet[currentSection].values.messageE_opacity_out);
                    sectionSet[currentSection].objs.introMsgE.style.opacity = `${opacityValue}`;

                }
                else  if ((offsetRate > 0.92) && (offsetRate <= 0.96))
                {
                    cs.objs.introMsgA.style.opacity = `0`;
                    cs.objs.introMsgB.style.opacity = `0`;
                    cs.objs.introMsgC.style.opacity = `0`;
                    cs.objs.introMsgD.style.opacity = `0`;
                    cs.objs.introMsgE.style.opacity = `1`;

                }
                else if ((offsetRate > 0.96) && (offsetRate <= 1.00))
                {
                    opacityValue = calcValue(sectionSet[currentSection].values.messageE_opacity_in);
                    sectionSet[currentSection].objs.introMsgE.style.opacity = `${opacityValue}`;
                }
                else
                {
                    cs.objs.introMsgA.style.opacity = `0`;
                    cs.objs.introMsgB.style.opacity = `0`;
                    cs.objs.introMsgC.style.opacity = `0`;
                    cs.objs.introMsgD.style.opacity = `0`;
                    cs.objs.introMsgE.style.opacity = `0`;

                }
                break;

            case 1 :
                
                break;
    
        }
    
    }


    // 스크롤시에 수행되는 함수
    const scrollLoop = function()
    {   
        // currentSection에 따른 CSS값을 설정.
        document.body.setAttribute('id', `show-section-${currentSection}`);

        // 해당 currentSection에서 실행할 애니메이션을 돌린다.
        playAnimation();
        
    }



    // main 상단 뮤직비디오의 fade out 효과 내기
    const mv = document.querySelector('.intro-video');

    let opaValue    = 0;
    let timerId     = null;

    const fadeOut = function()
    {

        if (opaValue <= 1)
        {
            mv.style.opacity = `${opaValue}`;
            opaValue += 0.01

        }
        else
        {
            mv.style.opacity = `1`;
            opaValue = 0;
            clearInterval(timerId);
            timerId = null;

            return;

        }

    }

    const fadeoutVideo = function()
    {
        opaValue = 0;
        timerId = setInterval(fadeOut, 10);

    }

    

//-------------------------------------------------------------------------
// 이벤트 핸들러
//-------------------------------------------------------------------------

    window.addEventListener('scroll', ()=>{

        // 스크롤값(yOffset), 
        // 현재 섹션 (currentSection)
        // 이전섹션의높이(prevSectionHeight)
        // 현재 섹션내에서의 스크롤값(sectionYOffset)
        yOffset             = window.scrollY;
        currentSection      = getCurrentSection();                    
        prevSectionHeight   = getPrevSectionHeight();
        sectionYOffset      = yOffset - prevSectionHeight;
 

        scrollLoop();

    });

    window.addEventListener('load', () => {

        initHTMLPage();


    });

    toggler.addEventListener('click', () => {
        
        toggler.classList.toggle('active');
        drawer.classList.toggle('active');

    });

    mv.addEventListener('play', () => {

        fadeoutVideo();

    });
    

})();