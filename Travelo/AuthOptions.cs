using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Travelo
{
    public class AuthOptions
    {
        public const string ISSUER = "TaskManagerServer";
        public const string AUDIENCE = "TaskManagerClient";
        const string KEY = "H7dh37HDdh2&#HHdj3823hdu2&DAh";
        public const int LIFETIME = 1;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}