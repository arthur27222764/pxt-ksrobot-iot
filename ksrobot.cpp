#include "pxt.h"
using namespace pxt;
namespace KSRobot_IOT
{

//%
void forever_stubs(void *a)
{
    runAction0((Action)a);
}

//%
void obloqforevers(Action a)
{
    if (a != 0)
    {
        incr(a);
        create_fiber(forever_stubs, (void *)a);
    }
}

} // namespace KSRobot_IOT
